import { Component, effect, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChatService } from '../../supabase/chat.service';
import { IChat } from '../../interfaces/chat-response.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  chatForm!: FormGroup;

  chats = signal<IChat[]>([]);

  private auth = inject(AuthService);
  private chatService = inject(ChatService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor() {
    this.chatForm = this.fb.group({
      message: ['', Validators.required],
    });

    effect(() => {
      this.displayAllChat();
    });
  }

  async logOut() {
    this.auth
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(err => {
        alert(err.message);
      });
  }

  onSubmit() {
    const formValue = this.chatForm.value.message;
    this.chatService
      .chatMessage(formValue)
      .then(() => {
        this.chatForm.reset();
        this.displayAllChat();
      })
      .catch(err => {
        alert(err.message);
      });
  }

  displayAllChat() {
    this.chatService
      .getAllChats()
      .then((res: IChat[] | null) => {
        console.log(res);
        if (res !== null) {
          this.chats.set(res);
        } else {
          console.log('no messages found');
        }
      })
      .catch(error => {
        alert(error.message);
      });
  }
}

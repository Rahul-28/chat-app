import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private supabase!: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async chatMessage(text: string) {
    try {
      const { data, error } = await this.supabase.from('chat').insert({ text });
      if (error) {
        alert(error.message);
      }
    } catch (error) {
      alert(error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getAllChats(): Promise<any> {
    try {
      const { data, error } = await this.supabase
        .from('chat')
        .select('*,users(*)');
      if (error) {
        alert(error.message);
      }
      return data;
    } catch (error) {
      alert(error);
    }
  }
}

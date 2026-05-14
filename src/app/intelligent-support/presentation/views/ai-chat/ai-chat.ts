import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { IntelligentSupportStore } from '../../../application/intelligent-support.store';

/**
 * AI-powered skincare chat assistant view.
 * Allows the user to ask skincare questions and receive AI-generated responses.
 * Displays a limitation banner when the query exceeds the AI's scope
 * and redirects the user to book a dermatology consultation if needed.
 */
@Component({
  selector: 'app-ai-chat',
  imports: [MatIconModule, TranslatePipe],
  templateUrl: './ai-chat.html',
  styleUrl: './ai-chat.css',
})
export class AiChat {
  readonly store = inject(IntelligentSupportStore);
  protected router = inject(Router);
  private readonly translator = inject(TranslateService);

  readonly inputText = signal<string>('');

  readonly faqQuestions: string[] = [
    'intelligentSupport.chat.faq.preventInjury',
    'intelligentSupport.chat.faq.faceMask',
    'intelligentSupport.chat.faq.oilySkin',
  ];

  constructor() {
    this.initializeChat();
  }
  private initializeChat(): void {
    if (!this.store.currentQuery()) {
      const newQuery = {
        id: Date.now(),
        user_id: 1,
        skin_profile_id: 1,
        last_facial_scan_id: 1,
        suggested_action: 'GENERAL_SUPPORT',
        status: 'ACTIVE',
        created_at: new Date().toISOString(),
      };
      this.store.startQuery(newQuery as any);
    }
  }

  onSendMessage(): void {
    const text = this.inputText().trim();
    const currentQuery = this.store.currentQuery();
    if (!text || !currentQuery) return;
    this.store.sendMessage(text, currentQuery.id);
    this.inputText.set('');
  }

  /**
   * Resolves the translation key of a FAQ question and sends it as a user message.
   * Uses TranslateService directly because pipes cannot be used inside event bindings.
   * @param questionKey - The i18n translation key of the selected FAQ question.
   */
  onSelectFaq(questionKey: string): void {
    const currentQuery = this.store.currentQuery();
    if (!currentQuery) return;
    const translatedText = this.translator.instant(questionKey);
    this.store.sendMessage(translatedText, currentQuery.id);
  }

  /**
   * Handles the Enter key in the input field.
   * Sends the message only when Enter is pressed without Shift.
   * @param event - The keyboard event from the input element.
   */
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSendMessage();
    }
  }

  /** Dismisses the AI limitation banner. */
  onDismissLimitationBanner(): void {
    this.store.dismissLimitationBanner();
  }

  /** Navigates to the select doctor screen to book a dermatology consultation. */
  onNavigateToDermatologist(): void {
    this.router.navigate(['/dermatology/select-doctor']);
  }

  /** Navigates back to the dashboard. */
  onNavigateBack(): void {
    this.router.navigate(['/dashboard']);
  }
}

// src/domains/ai/dto/translate.dto.js
export class TranslateRequestDTO {
  constructor(reportText, chatId = null, createNewChat = false, chatTitle = null) {
    this.reportText = reportText;
    this.chatId = chatId;
    this.createNewChat = createNewChat;
    this.chatTitle = chatTitle;
  }
}

export class TranslateResponseDTO {
  constructor(translatedText, simplifiedText, originalText, disclaimer, chatId, metadata = {}) {
    this.original = originalText;
    this.translated = translatedText;
    this.simplified = simplifiedText;
    this.disclaimer = disclaimer;
    this.chatId = chatId;
    this.metadata = {
      processingTime: metadata.processingTime,
      language: metadata.language || 'ne',
      modelVersion: metadata.modelVersion
    };
  }
}

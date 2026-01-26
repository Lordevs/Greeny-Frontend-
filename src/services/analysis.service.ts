import apiCaller from '@/lib/api/api-caller';
import { API_ROUTES } from '@/constants/api-routes';
import {
    UploadedFile,
    FileUploadResponse,
    ConversationListItem,
    Conversation,
    Message,
    AnalysisResponse,
    PaginatedResponse
} from '@/types/analysis';

export const analysisService = {
    // File Management
    async uploadFile(file: File): Promise<FileUploadResponse> {
        return apiCaller<FileUploadResponse>(
            API_ROUTES.FILES.BASE,
            'POST',
            { file },
            {},
            'formdata'
        );
    },

    async getFiles(): Promise<UploadedFile[]> {
        const response = await apiCaller<UploadedFile[] | PaginatedResponse<UploadedFile>>(API_ROUTES.FILES.BASE);
        return Array.isArray(response) ? response : response.results;
    },

    async getFileInsights(fileId: string) {
        return apiCaller(API_ROUTES.FILES.INSIGHTS(fileId));
    },

    // Conversations
    async getConversations(params?: { is_active?: boolean; file_id?: string }): Promise<ConversationListItem[]> {
        const response = await apiCaller<ConversationListItem[] | PaginatedResponse<ConversationListItem>>(
            API_ROUTES.CONVERSATIONS.BASE,
            'GET',
            null,
            { params }
        );
        return Array.isArray(response) ? response : response.results;
    },


    async createConversation(data: { title: string; description?: string; uploaded_file_id?: string; model?: string }): Promise<Conversation> {
        return apiCaller<Conversation>(API_ROUTES.CONVERSATIONS.BASE, 'POST', data);
    },

    async getConversation(id: string): Promise<Conversation> {
        return apiCaller<Conversation>(API_ROUTES.CONVERSATIONS.DETAIL(id));
    },

    async updateConversation(id: string, data: Partial<Conversation>): Promise<Conversation> {
        return apiCaller<Conversation>(API_ROUTES.CONVERSATIONS.DETAIL(id), 'PATCH', data);
    },

    async deleteConversation(id: string): Promise<void> {
        return apiCaller(API_ROUTES.CONVERSATIONS.DETAIL(id), 'DELETE');
    },

    // Analysis
    async analyze(conversationId: string, content: string): Promise<AnalysisResponse> {
        return apiCaller<AnalysisResponse>(API_ROUTES.CONVERSATIONS.ANALYZE(conversationId), 'POST', { content });
    },

    async getConversationMessages(conversationId: string): Promise<Message[]> {
        return apiCaller<Message[]>(API_ROUTES.CONVERSATIONS.MESSAGES(conversationId));
    },

    async clearMessages(conversationId: string): Promise<void> {
        return apiCaller(API_ROUTES.CONVERSATIONS.CLEAR_MESSAGES(conversationId), 'POST');
    },

    async changeModel(conversationId: string, model: string): Promise<Conversation> {
        return apiCaller<Conversation>(API_ROUTES.CONVERSATIONS.CHANGE_MODEL(conversationId), 'POST', { model });
    },

};

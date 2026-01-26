export type FileType = 'csv' | 'pdf';

export interface UploadedFile {
    id: string;
    user: number;
    file: string; // URL
    original_filename: string;
    file_type: FileType;
    file_size: number;
    file_size_mb: number;
    metadata: Record<string, any>;
    created_at: string;
    updated_at: string;
}

export interface AnalysisInsight {
    id: number;
    uploaded_file: string;
    model: string;
    insight_text: string;
    dataframe_context?: string;
    metadata: Record<string, any>;
    created_at: string;
}

export interface Message {
    id: number;
    conversation: string;
    role: 'user' | 'assistant';
    content: string;
    generated_code?: string;
    execution_result?: string;
    is_visualization: boolean;
    plot_image?: string; // base64
    metadata: Record<string, any>;
    error_message?: string;
    had_error: boolean;
    retry_count: number;
    created_at: string;
}

export interface Conversation {
    id: string;
    user: number;
    title: string;
    description?: string;
    uploaded_file?: UploadedFile;
    model: string;
    session_state: Record<string, any>;
    is_active: boolean;
    message_count: number;
    messages: Message[];
    created_at: string;
    updated_at: string;
}

export interface ConversationListItem {
    id: string;
    user: number;
    title: string;
    description?: string;
    uploaded_file?: UploadedFile;
    model: string;
    is_active: boolean;
    message_count: number;
    created_at: string;
    updated_at: string;
}


export interface AnalysisResponse {
    user_message: Message;
    assistant_message: Message;
    execution_warnings: string[];
    retry_count: number;
    success: boolean;
}

export interface FileUploadResponse {
    file: UploadedFile;
    insights?: string;
    dataframe_context?: string;
}
export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

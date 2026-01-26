import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { analysisService } from '@/services/analysis.service';
import { toast } from 'sonner';

export const useAnalysis = (conversationId?: string) => {
    const queryClient = useQueryClient();

    // Files
    const filesQuery = useQuery({
        queryKey: ['files'],
        queryFn: () => analysisService.getFiles(),
    });

    const uploadFileMutation = useMutation({
        mutationFn: (file: File) => analysisService.uploadFile(file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['files'] });
            toast.success('File uploaded successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'File upload failed');
        },
    });

    // Conversations
    const conversationsQuery = useQuery({
        queryKey: ['conversations'],
        queryFn: () => analysisService.getConversations(),
    });

    const conversationQuery = useQuery({
        queryKey: ['conversation', conversationId],
        queryFn: () => analysisService.getConversation(conversationId!),
        enabled: !!conversationId,
    });

    const createConversationMutation = useMutation({
        mutationFn: (data: { title: string; uploaded_file_id?: string; model?: string }) =>
            analysisService.createConversation(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
            toast.success('Conversation created');
        },
    });

    // Messages & Analysis
    const analyzeMutation = useMutation({
        mutationFn: (content: string) => analysisService.analyze(conversationId!, content),
        onSuccess: (data) => {
            // Optimitically update the conversation query data or invalidate
            queryClient.setQueryData(['conversation', conversationId], (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    messages: [...(old.messages || []), data.user_message, data.assistant_message],
                };
            });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Analysis failed');
        },
    });

    const deleteConversationMutation = useMutation({
        mutationFn: (id: string) => analysisService.deleteConversation(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
            toast.success('Conversation deleted');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Failed to delete conversation');
        },
    });



    return {
        files: filesQuery.data,
        isLoadingFiles: filesQuery.isLoading,
        uploadFile: uploadFileMutation.mutate,
        isUploading: uploadFileMutation.isPending,

        conversations: conversationsQuery.data,
        isLoadingConversations: conversationsQuery.isLoading,

        conversation: conversationQuery.data,
        isLoadingConversation: conversationQuery.isLoading,
        createConversation: createConversationMutation.mutate,
        isCreating: createConversationMutation.isPending,
        deleteConversation: deleteConversationMutation.mutate,

        analyze: analyzeMutation.mutate,
        isAnalyzing: analyzeMutation.isPending,
    };
};



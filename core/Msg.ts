export type MessageToken = 'user_created'
export const MessageTokenUserCreated: MessageToken = 'user_created'

export default {

    translate(token: MessageToken|string): string {
        switch (token) {
            case "user_created":
                return 'Usuário criado com sucesso. Faça login para continuar'
            default:
                return token
        }
    }

}
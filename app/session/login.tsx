import {Text} from '@/components/ui/text';
import {Alert, Keyboard, KeyboardAvoidingView, Platform, View} from "react-native"
import {moderateScale, scaleFont, verticalScale} from "@/lib/utils/font-scaling"
import {Button, ButtonIcon, ButtonText} from "@/components/ui/button"
import {ImgW, ImgWValue} from "@/components/widgets/ImgW"
import {VStack} from "@/components/ui/vstack"
import {Input, InputField, InputIcon, InputSlot} from "@/components/ui/input"
import {useEffect, useState} from "react"
import {EyeIcon, EyeOffIcon, Icon, LockIcon} from "@/components/ui/icon"
import * as SecureStore from 'expo-secure-store'
import str from "@/lib/utils/str"
import {router, useLocalSearchParams} from "expo-router"
import {HStack} from "@/components/ui/hstack"
import {useIsFocused} from "@react-navigation/native"
import {Toast, ToastTitle, useToast} from "@/components/ui/toast"
import {Send} from "lucide-react-native"
import {Divider} from "@/components/ui/divider"
import Msg from "@/core/Msg"
import {authStore} from "@/lib/stores/auth-store"
import {useLoadErrorContext} from "@/lib/contexts/LoadErrorContext"
import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader
} from "@/components/ui/alert-dialog"
import {Heading} from "@/components/ui/heading"
import sessionRepo from "@/lib/repo/sessionRepo"
import {useSQLiteContext} from "expo-sqlite"


export default function Login() {

    //
    const { setLoading, setErr } = useLoadErrorContext()
    const db = useSQLiteContext()

    //
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showForgotPassword, setShowForgotPassword] = useState(false)

    //
    const isFocused = useIsFocused()
    const toast = useToast()
    const params = useLocalSearchParams()

    //
    useEffect(() => {
        if (params.success && isFocused) {

            toast.show({
                placement: 'top',
                render: ({ id }) => {
                    const toastId = 'toast-' + id;
                    return (
                        <Toast
                            nativeID={toastId}
                            className="px-5 py-3 gap-4 shadow-soft-1 items-center flex-row"
                            action='success'
                        >
                            <Icon
                                as={Send}
                                size="xl"
                                className="fill-typography-100 stroke-none"
                            />
                            <Divider
                                orientation="vertical"
                                className="h-[30px] bg-outline-200"
                            />
                            <ToastTitle size="sm">{Msg.translate(params.success as string)}</ToastTitle>
                        </Toast>
                    );
                },
            });

        }
    }, [isFocused]);

    //
    function validate() {
        if (! str.isEmail(email)) throw new Error('Email inválido.')
        if (password.length <= 0) throw new Error('Senha requerida.')
    }


    async function submit()
    {
        Keyboard.dismiss()

        try {
            validate()
            setLoading(true)
            await sessionRepo.login(db, email, password)
            setLoading(false)

            router.replace('/(root)/dashboard')

        } catch (e: unknown) {
            setLoading(false)
            let reason = e+''
            if (e instanceof Error) reason = e.message
            Alert.alert('Erro', reason, [
                {
                    text: 'OK',
                    onPress: () => {},
                    style: 'destructive',
                }
            ], {
                cancelable: true,
                userInterfaceStyle: 'light'
            })
        }
    }

    function back() {
        router.replace('/session/onboarding')
    }

    async function sendForgotEmail()
    {
        setShowForgotPassword(false)

        try {
            setLoading(true)
            await sessionRepo.forgot(email)
            setLoading(false)

            //
            toast.show({
                placement: 'bottom',
                render: ({ id }) => {
                    const toastId = 'toast-' + id;
                    return (
                        <Toast
                            nativeID={toastId}
                            className="px-5 py-3 gap-4 shadow-soft-1 items-center flex-row"
                            action='success'
                        >
                            <Icon
                                as={Send}
                                size="xl"
                                className="fill-typography-100 stroke-none"
                            />
                            <Divider
                                orientation="vertical"
                                className="h-[30px] bg-outline-200"
                            />
                            <ToastTitle size="sm">Siga os passos no email para recuperar a senha.</ToastTitle>
                        </Toast>
                    );
                },
            });
        } catch (e) {
            setErr(e+'')
        }
    }

    //
    return <View
        style={{backgroundColor: '#717275'}}
        className={'h-full'}
    >
        <ImgW
            source={require('@/assets/img/border-art-1.jpg')}
            w={ImgWValue.fromScreenWidth(26)}
            style={{
                position: 'absolute', top: 0, left: 0
            }}
        />
        <ImgW
            source={require('@/assets/img/border-art-2.jpg')}
            w={ImgWValue.fromScreenWidth(26)}
            style={{
                position: 'absolute', bottom: 0, right: 0
            }}
        />

        <KeyboardAvoidingView
            style={{
                flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center',
                padding: verticalScale(24)
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        >
            <VStack className={'items-center gap-5'}>
                <ImgW
                    source={require('@/assets/img/logo-800.png')}
                    w={ImgWValue.fromScreenWidth(90)}
                    style={{marginStart: 10}}
                />
                <Text
                    style={{color: 'white', fontSize: scaleFont(16)}}
                >
                    Acesse sua conta
                </Text>
            </VStack>

            <VStack
                className={'w-full gap-5'} style={{marginTop: moderateScale(32)}}
            >
                <Input
                    variant="rounded"
                    size="lg"
                >
                    <InputField
                        className={'bg-white font-bold'}
                        textContentType={'emailAddress'}
                        placeholder="E-mail"
                        autoComplete={'email'}
                        value={email} onChangeText={setEmail}
                    />
                </Input>

                <Input
                    variant="rounded"
                    size="lg"
                    className={'bg-white'}
                >
                    <InputField
                        className={' font-bold'}
                        textContentType={'password'}
                        placeholder="Senha"
                        autoComplete={'off'}
                        type={showPassword ? 'text' : 'password'}
                        value={password} onChangeText={setPassword}
                    />
                    <InputSlot
                        style={{
                            marginEnd: scaleFont(10)
                        }}
                        onPress={() => setShowPassword(v => !v)}
                    >
                        <InputIcon as={showPassword ? EyeIcon : EyeOffIcon}/>
                    </InputSlot>
                </Input>

                <HStack className={'w-full gap-4'}>
                    <Button
                        variant="solid" size="lg" action="secondary"
                        className={'rounded-full grow'}
                        style={{height: moderateScale(42)}}
                        onPress={back}
                    >
                        <ButtonText className={'text-'}>
                            Voltar
                        </ButtonText>
                    </Button>
                    <Button
                        variant="solid" size="lg" action="accent"
                        className={'rounded-full grow'}
                        style={{height: moderateScale(42)}}
                        onPress={submit}
                    >
                        <ButtonText>
                            Entrar
                        </ButtonText>
                    </Button>
                </HStack>

                <HStack
                    className={'justify-center'}
                >
                    {email.length > 0 && <Button variant="link" onPress={() => {}}>
                        <ButtonIcon
                            as={LockIcon}
                            className="text-background-900 ml-1"
                        />
                        <ButtonText
                            className="text-typography-900 underline"
                            onPress={() => setShowForgotPassword(true)}
                        >
                            Esqueci a senha
                        </ButtonText>
                    </Button>}
                </HStack>

            </VStack>

        </KeyboardAvoidingView>

        <AlertDialog
            isOpen={showForgotPassword}
            onClose={() => setShowForgotPassword(false)} size="md"
        >
            <AlertDialogBackdrop />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <Heading className="text-typography-950 font-semibold" size="md">
                        Esqueci a senha!
                    </Heading>
                </AlertDialogHeader>
                <AlertDialogBody className="mt-3 mb-4">
                    <Text size="sm">
                        Um email será enviado para{'\n'}<Text className={'font-bold'}>{email}</Text>
                        {' '} com passos para recuperação da senha.
                    </Text>
                </AlertDialogBody>
                <AlertDialogFooter className="">
                    <Button
                        variant="outline"
                        action="secondary"
                        onPress={() => setShowForgotPassword(false)}
                        size="sm"
                    >
                        <ButtonText>Cancelar</ButtonText>
                    </Button>
                    <Button
                        size="sm"
                        onPress={sendForgotEmail}
                    >
                        <ButtonText>Enviar email</ButtonText>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    </View>

}
import {Text} from '@/components/ui/text';
import {Alert, Keyboard, KeyboardAvoidingView, Platform, View} from "react-native"
import {moderateScale, scaleFont, verticalScale} from "@/utils/font-scaling"
import {Button, ButtonText} from "@/components/ui/button"
import {ImgW, ImgWValue} from "@/components/widgets/ImgW"
import {VStack} from "@/components/ui/vstack"
import {Input, InputField, InputIcon, InputSlot} from "@/components/ui/input"
import {useEffect, useState} from "react"
import {EyeIcon, EyeOffIcon, Icon} from "@/components/ui/icon"
import * as SecureStore from 'expo-secure-store'
import str from "@/utils/str"
import {router, useLocalSearchParams} from "expo-router"
import {HStack} from "@/components/ui/hstack"
import {useIsFocused} from "@react-navigation/native"
import {Toast, ToastTitle, useToast} from "@/components/ui/toast"
import {Send} from "lucide-react-native"
import {Divider} from "@/components/ui/divider"
import Msg from "@/core/Msg"
import {authStore} from "@/lib/stores/auth-store"


export default function Login() {

    //
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

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

            const key = str.sanitize(email.trim() + '__password')
            const pwd = SecureStore.getItem(key)
            if (! pwd) throw new Error('Email inexistente.')
            if (pwd !== password) throw new Error('Senha inválida.')

            // success
            authStore.set('user.email', email.trim())
            router.replace('/(root)/dashboard')

        } catch (e: unknown) {
            let reason = e+''
            if (e instanceof Error) reason = e.message
            console.log(reason)
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
                        onPress={() => {if (router.canGoBack()) router.back()}}
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

            </VStack>

        </KeyboardAvoidingView>

    </View>

}
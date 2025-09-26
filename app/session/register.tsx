import {Text} from '@/components/ui/text';
import {Alert, Keyboard, KeyboardAvoidingView, Platform, View} from "react-native"
import {moderateScale, scaleFont, verticalScale} from "@/utils/font-scaling"
import {Button, ButtonText} from "@/components/ui/button"
import {ImgW, ImgWValue} from "@/components/widgets/ImgW"
import {VStack} from "@/components/ui/vstack"
import {Input, InputField, InputIcon, InputSlot} from "@/components/ui/input"
import {useState} from "react"
import {EyeIcon, EyeOffIcon} from "@/components/ui/icon"
import * as SecureStore from 'expo-secure-store'
import str from "@/utils/str"
import {HStack} from "@/components/ui/hstack"
import {router} from "expo-router"


export default function Register() {

    //
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [passwordConfirmed, setPasswordConfirmed] = useState('')
    const [showPasswordConfirmed, setShowPasswordConfirmed] = useState(false)

    //
    function validate() {
        if (! str.isEmail(email)) throw new Error('Email inválido.')
        if (password.length <= 0) throw new Error('Senha requerida.')
        if (passwordConfirmed.length <= 0) throw new Error('Confirmação de password requerida.')
        if (password !== passwordConfirmed) throw new Error('Senha e cofirmação de password devem ser iguais.')
    }


    async function submit()
    {
        Keyboard.dismiss()

        try {
            validate()

            const key = str.sanitize(email.trim() + '__password')
            const pwd = SecureStore.getItem(key)
            if (pwd) {
                setPassword('')
                setPasswordConfirmed('')
                throw new Error('Usuário já existente!')
            }

            // persist
            SecureStore.setItem(key, password)

            //
            router.replace('/session/login?success=user_created')

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
                    Primeiro acesso
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

                <Input
                    variant="rounded"
                    size="lg"
                    className={'bg-white'}
                >
                    <InputField
                        className={' font-bold'}
                        textContentType={'password'}
                        placeholder="Confirmação de senha"
                        autoComplete={'off'}
                        type={showPasswordConfirmed ? 'text' : 'password'}
                        value={passwordConfirmed} onChangeText={setPasswordConfirmed}
                    />
                    <InputSlot
                        style={{
                            marginEnd: scaleFont(10)
                        }}
                        onPress={() => setShowPasswordConfirmed(v => !v)}
                    >
                        <InputIcon as={showPasswordConfirmed ? EyeIcon : EyeOffIcon}/>
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
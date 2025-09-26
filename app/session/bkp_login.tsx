import {Text} from '@/components/ui/text';
import {Image, KeyboardAvoidingView, Platform, View} from "react-native"
import {SafeAreaView} from "react-native-safe-area-context"
import {moderateScale, scale, scaleFont, verticalScale} from "@/utils/font-scaling"
import {useMemo, useState} from "react"
import {Button, ButtonText} from "@/components/ui/button"
import {Input, InputField} from "@/components/ui/input"
import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
} from '@/components/ui/alert-dialog'
import {Box} from "@/components/ui/box"
import {Icon, MailIcon} from "@/components/ui/icon"
import {Heading} from "@/components/ui/heading"
import {HStack} from "@/components/ui/hstack"
import {CircleX} from "lucide-react-native"
import str from "@/utils/str"
import {router} from "expo-router"


export default function bkpLogin() {

    //
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [err, setErr] = useState('')

    //
    const cShowErr = useMemo(() => err && err.length > 0, [err])

    //
    function onSubmit() {

        setErr('')
        if (str.isEmail(email)) {
            setShowCodeDialog(true)
            setCode('')
        } else {
            setErr('Email inválido')
        }
    }

    //
    const [showCodeDialog, setShowCodeDialog] = useState(false)
    function handleClose() {
        setShowCodeDialog(false)
    }

    //
    function onLogin() {
        setShowCodeDialog(false)
        if (code !== '111111') return setErr('Código inválido, tente novamente.')
        router.replace('/(root)/dashboard')
    }


    //
    return <View
        style={{backgroundColor: '#717275'}}
        className={'h-full'}
    >
        <Image
            source={require('@/assets/img/border-art-1.jpg')}
            style={{ height: 256 * .6, width: 296 * .6, position: 'absolute' }}
        />
        <Image
            source={require('@/assets/img/border-art-2.jpg')}
            style={{
                height: 256 * .6, width: 296 * .6, position: 'absolute', bottom: 0, right: 0,
            }}
        />

        <SafeAreaView
            style={{
                flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center',
                gap: scale(32),
                padding: verticalScale(24)
            }}
        >
            <Image
                source={require('@/assets/img/logo-800.png')}
                style={{
                    width: '100%', height: 120, resizeMode: 'contain', marginStart: 20
                }}
            />
            <Text
                style={{ color: 'white', fontSize: scaleFont(16) }}
            >
                Acesse sua conta
            </Text>

            {cShowErr && <HStack
              className={'bg-error-500 w-full rounded p-3 items-center gap-3'}
            >
              <CircleX size={16} color={'white'} opacity={.5}/>
              <Text
                style={{color: 'white'}}
              >
                  {err}
              </Text>
            </HStack>}


            <KeyboardAvoidingView
                className={'w-full'}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <Input
                    variant="rounded"
                    size="lg"
                >
                    <InputField
                        className={'bg-white text-center font-bold'}
                        textContentType={'emailAddress'}
                        placeholder="Insira o email aqui"
                        autoComplete={'email'}
                        value={email} onChangeText={setEmail}
                    />
                </Input>

                <Button
                    variant="solid" size="lg" action="accent"
                    className={'rounded-full'}
                    style={{marginTop: moderateScale(12)}}
                    onPress={onSubmit}
                >
                    <ButtonText>
                        Entrar
                    </ButtonText>
                </Button>
            </KeyboardAvoidingView>
        </SafeAreaView>

        <AlertDialog isOpen={showCodeDialog} onClose={handleClose}>
            <AlertDialogBackdrop />
            <AlertDialogContent className="max-w-[415px] gap-4 items-center">
                <Box className="rounded-full h-[52px] w-[52px] bg-background-error items-center justify-center">
                    <Icon as={MailIcon} size="lg" className="stroke-primary-500" />
                </Box>
                <AlertDialogHeader className="mb-2">
                    <Heading size="md">Confirmação</Heading>
                </AlertDialogHeader>
                <AlertDialogBody>
                    <Text size="md" className="text-center">
                        Um email com um código foi enviado para
                        <Text className={'font-bold mx-3'}>
                            {' ' + email}
                        </Text>.
                        {"\n"}Insira-o aqui para entrar.
                    </Text>

                    <Input
                        variant="rounded"
                        size={'lg'}
                        className={'mt-5'}
                    >
                        <InputField
                            className={'bg-white text-center font-bold'}
                            textContentType={'oneTimeCode'}
                            placeholder="******"
                            autoComplete={'one-time-code'}
                            value={code} onChangeText={s => setCode(s.slice(0, 6))}
                            style={{letterSpacing: 10}}
                        />
                    </Input>
                </AlertDialogBody>
                <AlertDialogFooter className="mt-4">
                    <Button
                        size="md"
                        action="accent"
                        onPress={onLogin}
                        className="px-[30px] rounded-full"
                    >
                        <ButtonText>Enviar</ButtonText>
                    </Button>
                    <Button
                        variant="outline"
                        action="secondary"
                        onPress={handleClose}
                        size="md"
                        className="px-[30px] rounded-full"
                    >
                        <ButtonText>Cancelar</ButtonText>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    </View>

}
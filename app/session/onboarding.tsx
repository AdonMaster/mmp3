import {Text} from '@/components/ui/text';
import {View} from "react-native"
import {SafeAreaView} from "react-native-safe-area-context"
import {moderateScale, scale, scaleFont, verticalScale} from "@/utils/font-scaling"
import {Button, ButtonText} from "@/components/ui/button"
import {router} from "expo-router"
import {ImgW, ImgWValue} from "@/components/widgets/ImgW"
import {VStack} from "@/components/ui/vstack"

export default function Onboarding() {

    //
    function login() {
        router.push('/session/login')
    }

    function register() {
        router.push('/session/register')
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

        <SafeAreaView
            style={{
                flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center',
                gap: scale(32),
                padding: verticalScale(24)
            }}
        >
            <Text
                style={{ color: 'white', fontSize: scaleFont(16), marginBottom: moderateScale(24) }}
                className={'text-center'}
            >
                O 1º aplicativo apaixonado {'\n'} por Mesa Posta
            </Text>

            <ImgW
                source={require('@/assets/img/logo-800.png')}
                w={ImgWValue.fromScreenWidth(90)}
                style={{marginStart: 10}}
            />
            <Text
                style={{ color: 'white', fontSize: scaleFont(16) }}
            >
                Agora a mesa cabe no seu celular
            </Text>

            <VStack
                className={'w-full gap-5'}
            >
                <Button
                    variant="solid" size="lg" action="accent"
                    className={'rounded-full'}
                    style={{height: moderateScale(42) }}
                    onPress={login}
                >
                    <ButtonText>
                        ENTRAR
                    </ButtonText>
                </Button>
                <Button
                    variant="solid" size="lg" action="accent"
                    className={'rounded-full'}
                    style={{height: moderateScale(42) }}
                    onPress={register}
                >
                    <ButtonText>
                        CRIAR CONTA
                    </ButtonText>
                </Button>
            </VStack>
        </SafeAreaView>

    </View>

}
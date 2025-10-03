import {Text} from "@/components/ui/text"
import {Image} from "@/components/ui/image"
import {Box} from "@/components/ui/box"
import {Grid, GridItem} from '@/components/ui/grid'
import {Button, ButtonIcon, ButtonText} from "@/components/ui/button"
import {CogIcon, EditIcon, LightbulbIcon, UserIcon} from "lucide-react-native"
import {ScrollView, View} from "react-native"
import {FontAwesome6} from '@expo/vector-icons'
import {Card} from "@/components/ui/card"
import {VStack} from "@/components/ui/vstack"
import {Heading} from "@/components/ui/heading"
import {scale, verticalScale} from "@/utils/font-scaling"
import {authStore} from "@/lib/stores/auth-store"
import {ImgW, ImgWValue} from "@/components/widgets/ImgW"
import {router} from "expo-router"
import {useEffect, useState} from "react"
import {useIsFocused} from "@react-navigation/native"


export default function Dashboard() {

    //
    const isFocused = useIsFocused()
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')

    useEffect(() => {
        setUserName(authStore.getString('user.name') ?? '')
        setUserAvatar(authStore.getString('user.avatar') ?? '')
    }, [isFocused])

    //
    function onProfile() {
        router.push('/profile/profile')
    }

    //
    return <ScrollView><Box
        className={'p-4 h-full'}
        style={{backgroundColor: '#f4efe8'}}
    >

        <Text
            size='2xl' className='font-bold' style={{
            marginTop: scale(10),
            marginBottom: scale(36)
        }}
        >
            {userName ? 'Olá, '+userName : 'Seja bem vindo'}!
        </Text>

        <Grid
            className='mt-5'
            _extra={{
                className: 'grid-cols-12'
            }}
        >
            <GridItem
                className='flex items-start justify-center'
                _extra={{
                    className: 'col-span-4'
                }} style={{}}
            >
                {userAvatar
                    ? <Image
                        source={{uri: userAvatar}}
                        className={'rounded-full w-32 h-32'}
                        size='xl'
                    />
                    : <Image
                        source={require('@/assets/img/ph-avatar-woman.jpg')}
                        className={'rounded-full w-32 h-32'}
                        size='xl'
                    />
                }
            </GridItem>
            <GridItem _extra={{
                className: 'col-span-8 '
            }} style={{}}>

                <Grid
                    className={'gap-2'}
                    _extra={{
                        className: 'grid-cols-2'
                    }}
                >
                    <GridItem _extra={{
                        className: 'col-span-1'
                    }} style={{}}>
                        <Button
                            size='sm' style={{height: verticalScale(60)}} action='gray1' className='rounded-2xl'
                            onPress={onProfile}
                        >
                            <ButtonIcon as={UserIcon} className="mr-" />
                            <ButtonText>Perfil</ButtonText>
                        </Button>
                    </GridItem>
                    <GridItem _extra={{
                        className: 'col-span-1'
                    }} style={{}}>
                        <Button size='sm' style={{height: verticalScale(60)}} action='gray1' className='rounded-2xl'>
                            <ButtonIcon as={CogIcon} className="mr-"/>
                            <ButtonText>Configurações</ButtonText>
                        </Button>
                    </GridItem>
                    <GridItem _extra={{
                        className: 'col-span-1'
                    }} style={{}}>
                        <Button size='sm' style={{height: verticalScale(60)}} action='gray1' className='rounded-2xl'>
                            <ButtonIcon as={EditIcon} className="mr-"/>
                            <ButtonText>Inventário</ButtonText>
                        </Button>
                    </GridItem>
                    <GridItem _extra={{
                        className: 'col-span-1'
                    }} style={{}}>
                        <Button size='sm' style={{height: verticalScale((60))}} action='gray1' className='rounded-2xl'>
                            <ButtonIcon as={LightbulbIcon} className="mr-"/>
                            <ButtonText>Inspirações</ButtonText>
                        </Button>
                    </GridItem>
                </Grid>

            </GridItem>

        </Grid>

        <Box className={'mt-5'}>

            <Grid
                className='mt-5 gap-4'
                _extra={{
                    className: 'grid-cols-3'
                }}
            >
                <GridItem className='bg-white rounded-2xl items-center justify-center py-3 gap-2' _extra={{
                    className: 'col-span-1'
                }} style={{}}>
                    <ImgW
                        w={ImgWValue.fromScreenWidth(20)}
                        style={{marginStart: 20, marginEnd: 20}}
                        source={require('@/assets/img/dashboard-top-icons_camera.jpg')}
                    />
                    <Text size="md" className={'text-center'}>
                        Adicione suas peças
                    </Text>
                </GridItem>
                <GridItem className='bg-white rounded-2xl items-center justify-center py-3 gap-2' _extra={{
                    className: 'col-span-1'
                }} style={{}}>
                    <ImgW
                        w={ImgWValue.fromScreenWidth(20)}
                        style={{marginStart: 20, marginEnd: 20}}
                        source={require('@/assets/img/dashboard-top-icons_dinner.jpg')}
                    />
                    <Text size="md" className={'text-center'}>
                        Acervo
                    </Text>
                </GridItem>
                <GridItem className='bg-white rounded-2xl items-center justify-center py-3 gap-2' _extra={{
                    className: 'col-span-1'
                }} style={{}}>
                    <ImgW
                        w={ImgWValue.fromScreenWidth(20)}
                        style={{marginStart: 20, marginEnd: 20}}
                        source={require('@/assets/img/dashboard-top-icons_table.jpg')}
                    />
                    <Text size="md" className={'text-center'}>
                        Composições
                    </Text>
                </GridItem>
                <GridItem className='bg-white rounded-2xl items-center justify-center py-3 gap-2' _extra={{
                    className: 'col-span-1'
                }} style={{}}>
                    <ImgW
                        w={ImgWValue.fromScreenWidth(20)}
                        style={{marginStart: 20, marginEnd: 20}}
                        source={require('@/assets/img/dashboard-top-icons_calendar.jpg')}
                    />
                    <Text size="md" className={'text-center'}>
                        Calendário
                    </Text>
                </GridItem>
                <GridItem className='bg-white rounded-2xl items-center justify-center py-3 gap-2' _extra={{
                    className: 'col-span-1'
                }} style={{}}>
                    <ImgW
                        w={ImgWValue.fromScreenWidth(20)}
                        style={{marginStart: 20, marginEnd: 20}}
                        source={require('@/assets/img/dashboard-top-icons_girls.jpg')}
                    />
                    <Text size="md" className={'text-center'}>
                        Consultoras
                    </Text>
                    <View
                        style={{width: '100%', height: '100%', position: 'absolute', flex: 1, alignItems: 'flex-end'}}>
                        <FontAwesome6 name='certificate' color='#ef4444' size={24} style={{marginTop: -10}}/>
                    </View>
                </GridItem>
                <GridItem className='bg-white rounded-2xl items-center justify-center py-3 gap-2' _extra={{
                    className: 'col-span-1'
                }} style={{}}>
                    <ImgW
                        w={ImgWValue.fromScreenWidth(20)}
                        style={{marginStart: 20, marginEnd: 20}}
                        source={require('@/assets/img/dashboard-top-icons_bag.jpg')}
                    />
                    <Text size="md" className={'text-center'}>
                        Vitrine
                    </Text>
                    <View
                        style={{width: '100%', height: '100%', position: 'absolute', flex: 1, alignItems: 'flex-end'}}>
                        <FontAwesome6 name='certificate' color='#ef4444' size={24} style={{marginTop: -10}}/>
                    </View>
                </GridItem>
            </Grid>


        </Box>

        <View
            style={{height: 30}}
        />

        <Text
            size='2xl' className='my-5'
        >
            Novidades
        </Text>

        <Box>
            <Card className="rounded-lg">
                <Text className="text-sm font-normal mb-2 text-typography-700">
                    25 de Maio de 2026
                </Text>
                <VStack className="mb-6">
                    <Heading size="md" className="mb-4">
                        Módulo Consultoras
                    </Heading>
                    <Text size="sm">
                        Discover how the power of positive thinking can transform your life,
                        boost your confidence, and help you overcome challenges.
                    </Text>
                </VStack>

            </Card>
        </Box>

    </Box></ScrollView>
}
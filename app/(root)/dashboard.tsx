import {Text} from "@/components/ui/text"
import {Image} from "@/components/ui/image"
import {Box} from "@/components/ui/box"
import {Grid, GridItem} from '@/components/ui/grid'
import {Button, ButtonIcon, ButtonText} from "@/components/ui/button"
import {
    CalendarIcon,
    CameraIcon,
    CogIcon,
    EditIcon,
    HandbagIcon,
    LightbulbIcon,
    LucideUtensils,
    PackagePlusIcon,
    UserIcon,
    Users2Icon
} from "lucide-react-native"
import {View} from "react-native"
import {FontAwesome6} from '@expo/vector-icons'
import {Card} from "@/components/ui/card"
import {VStack} from "@/components/ui/vstack"
import {Heading} from "@/components/ui/heading"
import {Avatar, AvatarFallbackText, AvatarImage} from "@/components/ui/avatar"


export default function Dashboard() {

    return <Box
        className={'p-4 h-full'}
        style={{backgroundColor: '#f4efe8'}}
    >
        <Text
            size='2xl' className='font-bold my-5'
        >
            Olá, Maria Clara!
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
                    className: 'col-span-3'
                }} style={{}}
            >
                <Image
                    source={require('@/assets/img/ph-avatar-woman.jpg')}
                    className={'rounded-full w-24 h-24'}
                    size='xl'
                />
            </GridItem>
            <GridItem _extra={{
                className: 'col-span-9 '
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
                        <Button size='sm' style={{height: 48}} action='secondary' className='rounded-2xl'>
                            <ButtonIcon as={UserIcon} className="mr-2"/>
                            <ButtonText>Perfil</ButtonText>
                        </Button>
                    </GridItem>
                    <GridItem _extra={{
                        className: 'col-span-1'
                    }} style={{}}>
                        <Button size='sm' style={{height: 48}} action='secondary' className='rounded-2xl'>
                            <ButtonIcon as={CogIcon} className="mr-2"/>
                            <ButtonText>Configurações</ButtonText>
                        </Button>
                    </GridItem>
                    <GridItem _extra={{
                        className: 'col-span-1'
                    }} style={{}}>
                        <Button size='sm' style={{height: 48}} action='secondary' className='rounded-2xl'>
                            <ButtonIcon as={EditIcon} className="mr-2"/>
                            <ButtonText>Inventário</ButtonText>
                        </Button>
                    </GridItem>
                    <GridItem _extra={{
                        className: 'col-span-1'
                    }} style={{}}>
                        <Button size='sm' style={{height: 48}} action='secondary' className='rounded-2xl'>
                            <ButtonIcon as={LightbulbIcon} className="mr-2"/>
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
                    <Button size="lg" className="rounded-full" variant='solid' style={{width: 24}}>
                        <ButtonIcon as={CameraIcon}/>
                    </Button>
                    <Text size="md" className={'text-center'}>
                        Adicione suas peças
                    </Text>
                </GridItem>
                <GridItem className='bg-white rounded-2xl items-center justify-center py-3 gap-2' _extra={{
                    className: 'col-span-1'
                }} style={{}}>
                    <Button size="lg" className="rounded-full" variant='solid' style={{width: 24}}>
                        <ButtonIcon as={LucideUtensils}/>
                    </Button>
                    <Text size="md" className={'text-center'}>
                        Acervo
                    </Text>
                </GridItem>
                <GridItem className='bg-white rounded-2xl items-center justify-center py-3 gap-2' _extra={{
                    className: 'col-span-1'
                }} style={{}}>
                    <Button size="lg" className="rounded-full" variant='solid' style={{width: 24}}>
                        <ButtonIcon as={PackagePlusIcon}/>
                    </Button>
                    <Text size="md" className={'text-center'}>
                        Composições
                    </Text>
                </GridItem>
                <GridItem className='bg-white rounded-2xl items-center justify-center py-3 gap-2' _extra={{
                    className: 'col-span-1'
                }} style={{}}>
                    <Button size="lg" className="rounded-full" variant='solid' style={{width: 24}}>
                        <ButtonIcon as={CalendarIcon}/>
                    </Button>
                    <Text size="md" className={'text-center'}>
                        Calendário
                    </Text>
                </GridItem>
                <GridItem className='bg-white rounded-2xl items-center justify-center py-3 gap-2' _extra={{
                    className: 'col-span-1'
                }} style={{}}>
                    <View
                        style={{width: '100%', height: '100%', position: 'absolute', flex: 1, alignItems: 'flex-end'}}>
                        <FontAwesome6 name='certificate' color='#ef4444' size={24} style={{marginTop: -10}}/>
                    </View>
                    <Button size="lg" className="rounded-full" variant='solid' style={{width: 24}}>
                        <ButtonIcon as={Users2Icon}/>
                    </Button>
                    <Text size="md" className={'text-center'}>
                        Consultoras
                    </Text>
                </GridItem>
                <GridItem className='bg-white rounded-2xl items-center justify-center py-3 gap-2' _extra={{
                    className: 'col-span-1'
                }} style={{}}>
                    <View
                        style={{width: '100%', height: '100%', position: 'absolute', flex: 1, alignItems: 'flex-end'}}>
                        <FontAwesome6 name='certificate' color='#ef4444' size={24} style={{marginTop: -10}}/>
                    </View>
                    <Button size="lg" className="rounded-full" variant='solid' style={{width: 24}}>
                        <ButtonIcon as={HandbagIcon}/>
                    </Button>
                    <Text size="md" className={'text-center'}>
                        Vitrine
                    </Text>
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

    </Box>
}
import {Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, View} from "react-native"
import {Text} from "@/components/ui/text"
import {Button, ButtonIcon, ButtonText} from "@/components/ui/button"
import {ArrowLeftIcon, Icon} from "@/components/ui/icon"
import {router} from "expo-router"
import {Image} from "@/components/ui/image"
import {CircleCheck, ImageIcon} from "lucide-react-native"
import {fontScale} from "nativewind/theme"
import {moderateScale} from "@/utils/font-scaling"
import {authStore} from "@/lib/stores/auth-store"
import {VStack} from "@/components/ui/vstack"
import {Input, InputField} from "@/components/ui/input"
import {useEffect, useState} from "react"
import {Toast, ToastTitle, useToast} from "@/components/ui/toast"
import {Divider} from "@/components/ui/divider"
import {useIsFocused} from "@react-navigation/native"
import Str from "@/utils/str"
import * as ImagePicker from 'expo-image-picker'
import F from "@/lib/files/F"

export default function Profile() {

    const toast = useToast()
    const isFocused = useIsFocused()


    const [email, setemail] = useState('')
    const [avatar, setavatar] = useState('')
    const [name, setname] = useState('')
    const [phone, setphone] = useState('')
    const [city, setcity] = useState('')
    const [uf, setuf] = useState('')
    const [insta, setinsta] = useState('')

    //
    useEffect(() => {
        setavatar(authStore.getString('user.avatar') ?? '')
        setemail(authStore.getString('user.email') ?? '')
        setname(authStore.getString('user.name') ?? '')

        setphone(authStore.getString('user.phone') ?? '')
        setcity(authStore.getString('user.city') ?? '')
        setuf(authStore.getString('user.uf') ?? '')
        setinsta(authStore.getString('user.insta') ?? '')
    }, [isFocused])

    useEffect(() => {

    }, [])

    //
    function onBack() {
        router.back()
    }

    const showCustomAlert = (title: string, message: string) => {
        // Using RN's Alert component for cross-platform message boxes
        Alert.alert(title, message, [{ text: 'OK' }]);
    }
    const pickImage = async () => {
        // 1. Request Media Library Permissions (Required for Android 13+ and iOS)
        if (Platform.OS !== 'web') {
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                // Replacing 'alert' with the compliant 'showCustomAlert'
                showCustomAlert(
                    "Permission Required",
                    "Permission to access the media library is required to pick an image!"
                );
                return;
            }
        }

        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            // 3. Process the result
            if (!result.canceled) {
                // Use the first asset's URI from the 'assets' array
                const uri = result.assets[0].uri;
                const newUri = await F.replaceAvatar(avatar, uri, email)
                console.log(newUri)
                setavatar(newUri.uri)
            } else {
                console.log('cancelled')
            }
        } catch (error) {
            console.error("Image picking error:", error);
            showCustomAlert(
                "Loading Error",
                "An unexpected error occurred during image picking."
            );
        }
    }

    function submit() {
        authStore.set('user.avatar', avatar)
        authStore.set('user.name', name ?? '')
        authStore.set('user.phone', phone ?? '')
        authStore.set('user.city', city ?? '')
        authStore.set('user.uf', uf ?? '')
        authStore.set('user.insta', insta ?? '')

        Keyboard.dismiss()
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
                        <CircleCheck color={'white'}/>
                        <Divider
                            orientation="vertical"
                            className="h-[30px] bg-outline-200"
                        />
                        <ToastTitle size="sm">Perfil salvo com sucesso!</ToastTitle>
                    </Toast>
                );
            },
        });
    }

    //
    return <KeyboardAvoidingView>
        <View
            style={{flex: 1, alignItems: 'flex-start', paddingTop: 10, paddingStart: 20, paddingEnd: 20, marginBottom: 30}}
        >
            <Button variant="link" onPress={onBack}>
                <ButtonIcon
                    as={ArrowLeftIcon}
                    className="text-background-900 ml-1"
                />
                <ButtonText className="text-typography-900">
                    Voltar
                </ButtonText>
            </Button>
        </View>
        <ScrollView
            style={{
                padding: 20,
            }}
        >
            {/*header + picture*/}
            <View style={{backgroundColor: ''}}>
                <View
                    style={{
                        backgroundColor: '', flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row',
                        gap: moderateScale(24)
                    }}
                >
                    <View style={{backgroundColor: ''}}>
                        {avatar
                            ? <Image
                                source={{uri: avatar}}
                                className={'rounded-full w-32 h-32'}
                                size='xl'
                            />
                            : <Image
                                source={require('@/assets/img/ph-avatar-woman.jpg')}
                                className={'rounded-full w-32 h-32'}
                                size='xl'
                            />
                        }
                        <Button
                            size="lg" className="rounded-full p-3.5 absolute px-3"
                            style={{right: 0, bottom: 0, marginEnd: -8}}
                            onPress={pickImage}
                        >
                            <ButtonIcon as={ImageIcon} />
                        </Button>
                    </View>
                    <View style={{

                    }}>
                        <Text
                            style={{fontSize: fontScale(22)}}
                            className="text-typography-900"
                        >
                            {Str.ellipsis(name || 'Sem nome', 22)}
                        </Text>
                        <Text
                            style={{}}
                            className="text-typography-900"
                        >
                            {Str.ellipsis(email, 32)}
                        </Text>
                    </View>
                </View>
            </View>

            {/**/}
            <View style={{marginTop: 24}}>
                <Text style={{textAlign: 'center'}}>
                    Edite as caixas de texto e em seguida aperte "Salvar"
                </Text>
            </View>

            {/*form*/}
            <VStack style={{marginTop: 24}}>

                {/*field*/}
                <View>
                    <Text style={{marginBottom: 4, marginStart: 6}}>Nome</Text>
                    <Input
                        variant="rounded"
                        size="lg"
                    >
                        <InputField
                            className={'font-'} style={{backgroundColor: '#929396', color: 'white'}}
                            textContentType={'name'}
                            placeholder=""
                            value={name} onChangeText={setname}
                        />
                    </Input>
                </View>

                {/*field*/}
                <View style={{marginTop: 24}}>
                    <Text style={{marginBottom: 4, marginStart: 6}}>Telefone</Text>
                    <Input
                        variant="rounded"
                        size="lg"
                    >
                        <InputField
                            className={'font-'} style={{backgroundColor: '#929396', color: 'white'}}
                            textContentType={'telephoneNumber'}
                            placeholder=""
                            value={phone} onChangeText={setphone}
                        />
                    </Input>
                </View>

                {/*field*/}
                <View
                    style={{flex: 1, flexDirection: 'row', gap: 10}}
                >
                    <View style={{marginTop: 24, flexGrow: 4}}>
                        <Text style={{marginBottom: 4, marginStart: 6}}>Cidade</Text>
                        <Input
                            variant="rounded"
                            size="lg"
                        >
                            <InputField
                                className={'font-'} style={{backgroundColor: '#929396', color: 'white'}}
                                textContentType={'addressCity'}
                                placeholder=""
                                value={city} onChangeText={setcity}
                            />
                        </Input>
                    </View>
                    <View style={{marginTop: 24, flexGrow: 1}}>
                        <Text style={{marginBottom: 4, marginStart: 6, alignSelf: 'center'}}>UF</Text>
                        <Input
                            variant="rounded"
                            size="lg"
                        >
                            <InputField
                                className={'font-'} style={{backgroundColor: '#929396', color: 'white'}}
                                textContentType={'addressState'}
                                placeholder=""
                                value={uf} onChangeText={setuf}
                            />
                        </Input>
                    </View>
                </View>

                {/*field*/}
                <View style={{marginTop: 24}}>
                    <Text style={{marginBottom: 4, marginStart: 6}}>Instagram</Text>
                    <Input
                        variant="rounded"
                        size="lg"
                    >
                        <InputField
                            className={'font-'} style={{backgroundColor: '#929396', color: 'white'}}
                            textContentType={'username'}
                            placeholder=""
                            value={insta} onChangeText={setinsta}
                        />
                    </Input>
                </View>

                <View style={{marginTop: 24, flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    <Button
                        variant="solid" size="lg" action="gray1"
                        className={'rounded-full'}
                        style={{height: moderateScale(42)}}
                        onPress={submit}
                    >
                        <ButtonText>
                            Salvar
                        </ButtonText>
                    </Button>
                </View>

                {/*padding bottom to space*/}
                <View style={{marginTop: 48}}>
                </View>
            </VStack>



        </ScrollView>
    </KeyboardAvoidingView>

}
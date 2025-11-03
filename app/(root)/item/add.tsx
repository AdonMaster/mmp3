import {Text} from "@/components/ui/text"
import {Alert, Image as Img, Platform, TouchableOpacity, View} from "react-native"
import {Button, ButtonIcon, ButtonText} from "@/components/ui/button"
import {ArrowLeftIcon, ChevronRightIcon} from "@/components/ui/icon"
import {router} from "expo-router"
import {ImgW, ImgWValue} from "@/components/widgets/ImgW"
import {moderateScale} from "@/lib/utils/font-scaling"
import * as ImagePicker from 'expo-image-picker'
import Str from "@/lib/utils/str"
import F from "@/lib/files/F"
import {useSQLiteContext} from "expo-sqlite"
import mediaRepo from "@/lib/repo/mediaRepo"
import {useEffect, useState} from "react"
import {Media} from "@/lib/models/Media"
import {useIsFocused} from "@react-navigation/native"
import itemRepo from "@/lib/repo/itemRepo"
import {useLoadErrorContext} from "@/lib/contexts/LoadErrorContext"
import {nav} from "@/lib/utils/nav"


export default function ItemAdd() {

    //
    const db = useSQLiteContext()
    const isFocused = useIsFocused()
    const [media, setMedia] = useState<Media|null>(null)
    const { setLoading, setErr } = useLoadErrorContext()

    //
    useEffect(() => {
        setMedia(null)
    }, [isFocused])

    //
    const showCustomAlert = (title: string, message: string) => {
        Alert.alert(title, message, [{ text: 'OK' }]);
    }
    async function pickImage(source: 'gallery'|'camera') {
        // 1. Request Media Library Permissions (Required for Android 13+ and iOS)
        if (Platform.OS !== 'web') {
            const {status} = await (
                source === 'gallery'
                    ? ImagePicker.requestMediaLibraryPermissionsAsync()
                    : ImagePicker.requestCameraPermissionsAsync()
            );
            if (status !== 'granted') {
                // Replacing 'alert' with the compliant 'showCustomAlert'
                showCustomAlert(
                    "Permission Required",
                    `Permission to access ${source} is required to pick an image!`
                );
                return;
            }
        }

        try {
            const invoker = source === 'gallery'
                ? ImagePicker.launchImageLibraryAsync
                : ImagePicker.launchCameraAsync
            let result = await invoker({
                mediaTypes: ['images'],
                allowsEditing: true,
                quality: 1,
            });

            // 3. Process the result
            if (!result.canceled) {
                // Use the first asset's URI from the 'assets' array
                const uri = result.assets[0].uri;
                const newFilename = `${Str.randomAlpha(16)}`
                const newFile = await F.copyToDocuments(uri, 'item', newFilename)
                const media = await mediaRepo.create(db, newFile.uri, 'image', null)
                setMedia(media)
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

    async function save() {
        setLoading(true)
        try {
            if (!media) throw new Error('Media not valid')

            const thumb = await mediaRepo.cloneThumb(db, media)
            const model = await itemRepo.create(db, 'Geral/Sem categoria', media.id, thumb.id)
            await mediaRepo.setOwner(db, thumb.id, 'item@' + model.id)
            await mediaRepo.setOwner(db, media.id, 'item@' + model.id)
            setLoading(false)
            router.replace({
                pathname: '/(root)/item/edit',
                params: { id: model.id }
            })
        } catch (e) {
            setErr(e instanceof Error ? e.message : e+'')
        }
    }

    return <View
        style={{
            flex: 1, justifyContent: 'flex-start', alignItems: 'stretch',
            padding: 20, gap: 10
        }}
    >
        {/*header*/}
        <View
            style={{marginBottom: 20}}
        >
            {/*back*/}
            <View
                style={{
                    alignItems: 'center', justifyContent: 'center'
                }}
            >
                {/*back*/}
                <Button
                    style={{position: 'absolute', left: 0, top: 0}}
                    variant="link" onPress={nav.back}
                >
                    <ButtonIcon
                        as={ArrowLeftIcon}
                        className="text-background-900 ml-1"
                    />
                </Button>

                {/*title*/}
                <Text size="xl" className="font-bold mt-1">
                    Adicione suas peças
                </Text>
            </View>
        </View>

        {/*buttons*/}
        <View
            style={{
                flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: moderateScale(10),
            }}
        >
            <TouchableOpacity
                onPress={() => pickImage('camera')}
            >
                <ImgW
                    w={ImgWValue.fromScreenWidth(10)}
                    style={{marginStart: 20, marginEnd: 20}}
                    source={require('@/assets/img/ic_camera_dark.png')}
                />
                <Text size="md" className={'text-center'}>
                    Tirar foto
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => pickImage('gallery')}
            >
                <ImgW
                    w={ImgWValue.fromScreenWidth(10)}
                    style={{marginStart: 20, marginEnd: 20}}
                    source={require('@/assets/img/ic_album_dark.png')}
                />
                <Text size="md" className={'text-center'}>
                    Galeria
                </Text>
            </TouchableOpacity>
        </View>

        {/*container*/}
        <View
            style={{
                flex: 1, backgroundColor: '#dddddd', borderRadius: 16
            }}
        >
            {/*empty*/}
            {media == null && <View
                style={{
                    flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10
                }}
            >
                <ImgW
                    w={ImgWValue.fromScreenWidth(32)}
                    style={{marginStart: 20, marginEnd: 20}}
                    source={require('@/assets/img/ph-flower-grayscale.png')}
                />
                <Text>
                    Selecione uma opção acima para incluir imagem
                </Text>
            </View>}

            {/*media*/}
            {media != null && <Img
                source={{uri: media.uri}}
                resizeMode={'contain'}
                height={'100%'} width={'100%'}
                alt={'media'}
            />}
        </View>

        {/*next*/}
        <Button
            variant="solid" action={'positive'} size={'lg'} isDisabled={media === null}
            style={{

            }}
            onPress={save}
        >
            <ButtonText>Continuar</ButtonText>
            <ButtonIcon as={ChevronRightIcon} className="ml-" />
        </Button>
    </View>

}
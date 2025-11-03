import {Image as Img, KeyboardAvoidingView, View} from "react-native"
import {Text} from "@/components/ui/text"
import {router, useLocalSearchParams} from "expo-router"
import {useIsFocused} from "@react-navigation/native"
import {useCallback, useEffect, useState} from "react"
import {Item} from "@/lib/models/Item"
import ItemRepo from "@/lib/repo/itemRepo"
import {useSQLiteContext} from "expo-sqlite"
import {Num} from "@/lib/utils/num"
import {Button, ButtonIcon} from "@/components/ui/button"
import {ArrowLeftIcon, ChevronDownIcon} from "@/components/ui/icon"
import {
    Select,
    SelectBackdrop,
    SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper,
    SelectIcon,
    SelectInput, SelectItem,
    SelectPortal,
    SelectTrigger
} from "@/components/ui/select"
import {nav} from "@/lib/utils/nav"

export default function ItemEdit() {

    //
    const db = useSQLiteContext()
    const params = useLocalSearchParams<{ id: string }>()
    const isFocused = useIsFocused()

    //
    const [model, setModel] = useState<Item|null>(null)

    //
    const load = useCallback(async () => {
        const r = await ItemRepo.find(db, Num.parseInt(params.id))
        await r?.loadMedias(db)
        setModel(r)
    }, [params])

    // focused
    useEffect(() => {
        load()
    }, [isFocused])

    //
    if (!model) return <View>
        <Text>Carregando...</Text>
    </View>

    //
    return <View
        style={{
            flex: 1, justifyContent: 'flex-start', alignItems: 'stretch',
            padding: 20, gap: 10
        }}
    >
        {/*header*/}
        <View
            style={{marginBottom: 0}}
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
                    Editar
                </Text>
            </View>
        </View>

        <Img
            src={model.imgMedia!.uri} resizeMode={'cover'} alt={'item'}
            width={'100%'} height={100}
            style={{
                borderRadius: 10
            }}
        />

        <KeyboardAvoidingView
            style={{
                marginTop: 10
            }}
        >
            <View>
                <View style={{}}>
                    <Text style={{marginBottom: 4}}>Categoria</Text>
                    <Select>
                        <SelectTrigger variant="outline" size="md">
                            <SelectInput placeholder="Select option" />
                            <SelectIcon className="mr-3" as={ChevronDownIcon} />
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectBackdrop />
                            <SelectContent>
                                <SelectDragIndicatorWrapper>
                                    <SelectDragIndicator />
                                </SelectDragIndicatorWrapper>
                                <SelectItem label="Geral/Sem categoria" value="Geral/Sem categoria" />
                            </SelectContent>
                        </SelectPortal>
                    </Select>
                </View>
            </View>
        </KeyboardAvoidingView>

    </View>
}
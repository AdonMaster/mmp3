import {Text} from "@/components/ui/text"
import {ScrollView, TouchableOpacity, View} from "react-native"
import {Button, ButtonIcon} from "@/components/ui/button"
import {ArrowLeftIcon, SearchIcon} from "@/components/ui/icon"
import {ImgW, ImgWValue} from "@/components/widgets/ImgW"
import {useSQLiteContext} from "expo-sqlite"
import {useEffect, useState} from "react"
import {useIsFocused} from "@react-navigation/native"
import itemRepo from "@/lib/repo/itemRepo"
import {useLoadErrorContext} from "@/lib/contexts/LoadErrorContext"
import {nav} from "@/lib/utils/nav"
import {Input, InputField, InputIcon, InputSlot} from "@/components/ui/input"
import {Box} from "@/components/ui/box"
import {Grid, GridItem} from "@/components/ui/grid"
import {arr, Categorized} from "@/lib/utils/arr"
import {Pair} from "@/lib/types/generalTypes"
import {useQueryContext} from "@/lib/contexts/QueryContext"
import {router} from "expo-router"


export default function ItemList() {

    //
    const db = useSQLiteContext()
    const isFocused = useIsFocused()
    const { setLoading, setErr } = useLoadErrorContext()
    const {q, setQ} = useQueryContext()
    const [data, setData] = useState<Categorized<Pair<string, number>>>([])

    //
    useEffect(() => {
        load()
    }, [isFocused])

    async function load() {
        const rr = await itemRepo.queryCategoryPluck(db, q)
        const rrCategorized = arr.categorize(rr, p => p.left.split('/').at(0) ?? '')
        setData(rrCategorized)
    }

    return <View
        style={{
            flex: 1, justifyContent: 'flex-start', alignItems: 'stretch',
            padding: 20, gap: 10
        }}
    >
        {/*header*/}
        <View
            style={{marginBottom: 8}}
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
                    Acervo
                </Text>
            </View>
        </View>

        {/*search*/}
        <Input
            variant="rounded" size="lg"
        >
            <InputSlot className="pl-3">
                <InputIcon as={SearchIcon} />
            </InputSlot>
            <InputField
                value={q} onChangeText={setQ}
                placeholder="Procurar..." className={'font-bold'}
            />
        </Input>

        {/*content*/}
        <ScrollView>
            {data.map(c => (
                <Box key={c.category}>
                    <Text
                        className={'font-bold text-neutral-400 py-3'}
                    >
                        {c.category || '~ sem categoria ~'}
                    </Text>
                    <Grid className="gap-3" _extra={{className: 'grid-cols-3'}}>
                        {c.items.map(i => (
                            <GridItem
                                key={i.left} className={'p-3'} _extra={{className: 'col-span-1'}}
                            >
                                <TouchableOpacity
                                    style={{
                                        alignItems: 'center'
                                    }}
                                    onPress={()=>router.push({
                                        pathname: '/(root)/item/list-item',
                                        params: { category: i.left }
                                    })}
                                >
                                    <ImgW
                                        source={require('@/assets/img/ic_folder.png')} w={ImgWValue.fromScreenWidth(20)}
                                    />
                                    <Text className={'text-center'}>
                                        { i.left.split('/').at(1) || '-' }
                                    </Text>
                                    <Text className={'text-center font-bold'}>
                                        ({i.right})
                                    </Text>
                                </TouchableOpacity>
                            </GridItem>
                        ))}
                    </Grid>
                </Box>
            ))}
        </ScrollView>

    </View>

}
import {Text} from "@/components/ui/text"
import {useQueryContext} from "@/lib/contexts/QueryContext"
import {FlatList, FlatListComponent, TouchableOpacity, View} from "react-native"
import {Button, ButtonIcon} from "@/components/ui/button"
import {nav} from "@/lib/utils/nav"
import {ArrowLeftIcon, SearchIcon} from "@/components/ui/icon"
import {Input, InputField, InputIcon, InputSlot} from "@/components/ui/input"
import {router, useLocalSearchParams} from "expo-router"
import {Box} from "@/components/ui/box"
import {Fragment, useCallback, useEffect, useMemo, useState} from "react"
import {Item, ItemWithMediaAttr} from "@/lib/models/Item"
import itemRepo from "@/lib/repo/itemRepo"
import {useSQLiteContext} from "expo-sqlite"
import {ImgW, ImgWValue} from "@/components/widgets/ImgW"
import {Image} from "@/components/ui/image"

export default function ItemListItem() {

    const db = useSQLiteContext()
    const {q, setQ} = useQueryContext()
    const params = useLocalSearchParams()
    const [data, setData] = useState<ItemWithMediaAttr[]>([])

    //
    const cCategories = useMemo(() => {
        return (params.category as string || '').split('/')
    }, [params])

    //
    useEffect(() => {
        load()
    }, [params.category])

    //
    async function load() {
        const rr = await itemRepo.queryByCategory(db, params.category as string, q)
        setData(rr)
    }

    //
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
                    Categoria
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
                placeholder="Procurar..." className={'font-bold'} />
        </Input>

        {/*breadcrumbs*/}
        <Box className={'flex-row gap-3'}>
            {cCategories.map(c => (
                <Fragment key={c}>
                    <Text
                        key={c}
                        className={'font-bold text-neutral-400'}
                    >
                        {c || '~ sem categoria ~'}
                    </Text>
                    <Text
                        key={c+'@'}
                        className={'text-neutral-300'}
                    >
                        /
                    </Text>
                </Fragment>
            ))}
        </Box>

        {/*list*/}
        <FlatList
            data={data}
            keyExtractor={(item) => item.id+''}
            numColumns={3}
            columnWrapperStyle={{
                justifyContent: 'space-between',
                paddingHorizontal: 0,
                paddingVertical: 4
            }}
            renderItem={({ item }) => (
                <TouchableOpacity
                    key={item.id}
                    style={{
                        alignItems: 'center'
                    }}
                    onPress={()=>router.push({
                        pathname: '/(root)/item/edit',
                        params: { id: item.id }
                    })}
                >
                    <ImgW source={item.thumbMediaUri} w={ImgWValue.fromScreenWidth(28)}/>
                </TouchableOpacity>
            )}/>
    </View>
}
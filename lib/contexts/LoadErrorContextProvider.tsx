import {ReactNode, useMemo, useState} from "react"
import {LoadErrorContext} from "@/lib/contexts/LoadErrorContext"
import {View} from "react-native"
import {Spinner} from "@/components/ui/spinner"
import {Text} from "@/components/ui/text"
import {moderateScale, scaleFont, verticalScale} from "@/lib/utils/font-scaling"
import {Button, ButtonText} from "@/components/ui/button"
import {TriangleAlert} from "lucide-react-native"

export default function LoadErrorContextProvider(p: {children: ReactNode}) {

    //
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState('')

    //
    function reset() {
        setLoading(false)
        setErr('')
    }

    //
    const showOverload = useMemo(() => loading || err.length > 0, [loading, err])

    //
    function proxySetLoading(option: boolean) {
        reset()
        setLoading(option)
    }
    function proxySetErr(reason: string) {
        reset()
        setErr(reason)
    }

    //
    return <LoadErrorContext.Provider
        value={{ setLoading: proxySetLoading, setErr: proxySetErr, reset }}
    >
        {/*children*/}
        {p.children}

        {/*overlay*/}
        {showOverload && <View
            style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundColor: '#000000bb', flex: 1, alignItems: 'center', justifyContent: 'center'
            }}
        >
            {/*loading*/}
            {loading && <Spinner size="large" color="white"/>}

            {/*err*/}
            {err.length > 0 && <View
                style={{
                    backgroundColor: 'white', padding: 24, borderRadius: 16, margin: 16
                }}
            >
                <TriangleAlert
                    color={'#ec4949'} size={moderateScale(42)}
                    style={{
                        alignSelf: 'center'
                    }}
                />

                <Text
                    style={{
                        color: '#434343', fontWeight: 'bold', fontSize: scaleFont(16),
                        marginTop: 20, marginBottom: 20
                    }}
                >
                    {err}
                </Text>

                <Button
                    variant="solid" size="lg" action="negative"
                    className={''}
                    onPress={reset}
                >
                    <ButtonText>
                        OK
                    </ButtonText>
                </Button>
            </View>}
        </View>}

    </LoadErrorContext.Provider>
}
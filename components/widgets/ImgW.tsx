import React, {useEffect, useState} from 'react';
import {Dimensions, Image, type ImageSourcePropType, StyleProp, View, ViewStyle} from 'react-native';

export class ImgWValue {
    private constructor(public v: number, public isScreenPercent: boolean) {
    }
    static fromScreenWidth(v: number) {
        return new ImgWValue(v, true)
    }
    static fromAbsolute(v: number) {
        return new ImgWValue(v, false)
    }
    calculate() {
        if (this.isScreenPercent) {
            const { width: screenWidth } = Dimensions.get('window')
            return (this.v * screenWidth) / 100
        }
        return this.v
    }
}

export const ImgW = ({ source, w, style }: { source: ImageSourcePropType, w: ImgWValue, style?: StyleProp<ViewStyle> }) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (source) {
            // Use resolveAssetSource to get dimensions from both remote URIs and local assets
            const resolvedSource = Image.resolveAssetSource(source);

            if (resolvedSource && resolvedSource.width && resolvedSource.height) {
                const originalWidth = resolvedSource.width;
                const originalHeight = resolvedSource.height;
                const ratio = originalHeight / originalWidth

                const desiredWidth = w.calculate();
                const desiredHeight = ratio * desiredWidth;

                setDimensions({ width: desiredWidth, height: desiredHeight });
            } else {
                Image.getSize(resolvedSource.uri, (originalWidth, originalHeight) => {
                    const desiredWidth = w.calculate();
                    const desiredHeight = (originalHeight / originalWidth) * desiredWidth;
                    setDimensions({ width: desiredWidth, height: desiredHeight });
                }, (error) => {
                    console.error("Failed to get image size:", error);
                });
            }
        }
    }, [source, w]);

    return (
        <View style={[style]}>
            {dimensions.width > 0 && dimensions.height > 0 && (
                <Image
                    source={source}
                    style={{ width: dimensions.width, height: dimensions.height }}
                    resizeMode="contain"
                    alt={source+''}
                />
            )}
        </View>
    );
}
import {Directory, File, Paths} from 'expo-file-system'

export default {

    async copyToDocuments(fromUri: string, folder: string, filename: string): Promise<File>
    {
        const from = new File(fromUri)
        if (! from.exists) throw new Error('[from] doesnt exists')

        //
        const dir = new Directory(Paths.document, folder)
        if (! dir.exists) dir.create()

        //
        const to = new File(dir, filename)
        if (to.exists) to.delete()

        //
        from.copy(to)

        return to
    },

    async replaceAvatar(old: string|undefined, fromUri: string, targetFilename: string): Promise<File> {

        // check from
        const fromFile = new File(fromUri)
        if (! fromFile.exists) throw new Error('[fromUri] file doesnt exists')

        // remove old
        if (old) {
            const oldFile = new File(old)
            if (oldFile.exists) oldFile.delete()
        }

        //
        const finalFilename = `${Date.now()}__${targetFilename}`
        return this.copyToDocuments(fromFile.uri, 'avatars', finalFilename)
    }

}
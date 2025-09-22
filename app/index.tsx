import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogBody,
    AlertDialogBackdrop,
} from '@/components/ui/alert-dialog';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Icon, TrashIcon } from '@/components/ui/icon';
import { Box } from '@/components/ui/box';
import {useState} from "react";

function Example() {
    const [showAlertDialog, setShowAlertDialog] = useState(false);
    const handleClose = () => setShowAlertDialog(false);
    return (
        <Box className={'p-4'}>
            <Button onPress={() => setShowAlertDialog(true)}>
                <ButtonText>Delete Invoisce</ButtonText>
            </Button>
            <AlertDialog
                isOpen={showAlertDialog}
                onClose={handleClose}
                useRNModal={false}
            >
                <AlertDialogBackdrop />
                <AlertDialogContent className="gap-4 items-center">
                    <Box className="rounded-full h-[52px] w-[52px] bg-background-error items-center justify-center">
                        <Icon as={TrashIcon} size="lg" className="stroke-error-500" />
                    </Box>
                    <AlertDialogHeader className="mb-2">
                        <Heading size="md">Delete account?</Heading>
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        <Text size="sm" className="text-center">
                            The invoice will be deleted from the invoices section and in the
                            documents folder. This cannot be undone.
                        </Text>
                    </AlertDialogBody>
                    <AlertDialogFooter className="mt-5">
                        <Button
                            size="sm"
                            action="negative"
                            onPress={handleClose}
                            className="px-[30px]"
                        >
                            <ButtonText>Delete</ButtonText>
                        </Button>
                        <Button
                            variant="outline"
                            action="secondary"
                            onPress={handleClose}
                            size="sm"
                            className="px-[30px]"
                        >
                            <ButtonText>Cancel</ButtonText>
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Box>
    );
}

export default Example
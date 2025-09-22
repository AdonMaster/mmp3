import {
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@/components/ui/modal';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Icon, TrashIcon } from '@/components/ui/icon';
import { Box } from '@/components/ui/box';
import {useState} from "react"

export default function Example() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <Button onPress={() => setShowModal(true)}>
                <ButtonText>Delete Post</ButtonText>
            </Button>
            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                }}
            >
                <ModalBackdrop />
                <ModalContent className="max-w-[305px] items-center">
                    <ModalHeader>
                        <Box className="w-[56px] h-[56px] rounded-full bg-background-error items-center justify-center">
                            <Icon as={TrashIcon} className="stroke-error-600" size="xl" />
                        </Box>
                    </ModalHeader>
                    <ModalBody className="mt-0 mb-4">
                        <Heading size="md" className="text-typography-950 mb-2 text-center">
                            Delete blog post
                        </Heading>
                        <Text size="sm" className="text-typography-500 text-center">
                            Are you sure you want to delete this post? This action cannot be
                            undone.
                        </Text>
                    </ModalBody>
                    <ModalFooter className="w-full">
                        <Button
                            variant="outline"
                            action="secondary"
                            size="sm"
                            onPress={() => {
                                setShowModal(false);
                            }}
                            className="flex-grow"
                        >
                            <ButtonText>Cancel</ButtonText>
                        </Button>
                        <Button
                            onPress={() => {
                                setShowModal(false);
                            }}
                            size="sm"
                            className="flex-grow"
                        >
                            <ButtonText>Delete</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

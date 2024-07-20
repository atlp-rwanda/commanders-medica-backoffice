'use client'
import { createClient } from "@/utils/supabase/client";
import Image from "next/image"
import { useEffect, useState, useRef, FormEvent } from "react"
import { useRouter } from "next/navigation";
import { pathRevalidation } from "@/utils/supabase/getUser";
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
const supabase = createClient();

interface SendMessage {
    sender_id: string;
    doctor_id: string;
    appointment_id: string;
}

export default function MessageSender({ sender_id, doctor_id, appointment_id }: SendMessage) {
    const router = useRouter();
    const [text, setText] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const emojiButton = useRef<HTMLButtonElement>(null);
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const [message, setMessage] = useState<string>('');

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const onEmojiClick = (emojiData: EmojiClickData) => {
        setText(prevText => prevText + emojiData.emoji);
        console.log(emojiData);
        console.log('ddkdjfakldfj')
        setShowEmojiPicker(false);
    };


    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);
            mediaRecorder.current.start();

            const audioChunks: BlobPart[] = [];
            mediaRecorder.current.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.current.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                setAudioBlob(audioBlob);
            });

            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing microphone:", err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
            setIsRecording(false);
        }
    };

    const uploadFile = async (file: File | Blob, fileType: string) => {
        const fileName = `${fileType}_${Date.now()}.${fileType === 'image' ? 'png' : 'webm'}`;
        const { data, error } = await supabase.storage
            .from('files')
            .upload(`messages/${doctor_id}${fileName}`, file);

        if (error) {
            console.log('Error uploading file:', error);
            return null;
        }
        console.log('File uploaded successfully:', data);
        return data.path;
    };

    const createMessage = async (event: FormEvent) => {
        event.preventDefault();
        let imagePath = null;
        let audioPath = null;
        let message = null;
        let type=null;
        console.log(imageFile)
        if (imageFile) {
            console.log(imageFile);
            imagePath = await uploadFile(imageFile, 'image');
            type= 'image';
        }

        if (audioBlob) {
            audioPath = await uploadFile(audioBlob, 'audio');
            type= 'audio';
        }
        if (text.trim() !== '' || text !== null) {
            const { data: imageUrl } = await supabase.storage.from('files').getPublicUrl(imagePath!)
            const {data: audioUrl}= await supabase.storage.from('files').getPublicUrl(audioPath!)
            const messageData = {
                sender_id: doctor_id,
                appointment_id,
                type: type || 'message',
                message: text || imageUrl.publicUrl || audioUrl.publicUrl,
                image_url: imageUrl.publicUrl,
                audio_url: audioUrl.publicUrl
            };
            const { data, error } = await supabase.from('messages').insert(messageData);

            if (error) {
                console.log('Error sending message:', error);
            } else {
                setText('');
                setImageFile(null);
                setAudioBlob(null);
                pathRevalidation("messages");
                router.refresh();
            }

            return data;
        }
    };
    const handleSendClick = () => {
        if (isRecording) {
            stopRecording();
        } else if (text || imageFile || audioBlob) {
            createMessage(new Event('submit') as any);
        } else {
            startRecording();
        }
    };

    return (
        <div className="">
            {audioBlob && (
                <div className="mt-2">
                    <audio controls src={URL.createObjectURL(audioBlob)} />
                </div>
            )}
            {imageFile && (
                <div className="mt-2">
                    <p>Image selected: {imageFile.name}</p>
                    <Image src={imageFile.webkitRelativePath} width={50} height={50} alt="image" />
                </div>
            )}
            <form className="w-full" onSubmit={createMessage}>
                <div className="w-[100%] bg-gray-200 rounded-xl p-2 flex gap-[20px] items-center">
                    <div className="relative w-[90%]">
                        <input
                            type="text"
                            id="message"
                            name="message"
                            value={text}
                            placeholder="Type here"
                            className="rounded-xl pl-[50px] p-4 w-full"
                            onChange={(event) => setText(event.target.value)}
                        />
                        <button
                            ref={emojiButton}
                            className="absolute left-[20px] bottom-[35%]"
                            type="button"
                            onClick={toggleEmojiPicker}
                        >
                            <Image src={require("../../assets/icons/emoji.svg")} alt="emoji" />
                        </button>
                        {showEmojiPicker && (
                            <div className="absolute bottom-full left-0 mb-2">
                                <EmojiPicker onEmojiClick={(emoji: EmojiClickData) => {
                                    setText(prevText => prevText + emoji.emoji);
                                    setShowEmojiPicker(false);
                                }} />
                            </div>
                        )}
                        <div className="flex gap-[10px] absolute bottom-[35%] right-[20px]">
                            <div>
                                <label htmlFor="image-upload">
                                    <Image src={require("../../assets/icons/appareil.svg")} alt="upload" />
                                </label>
                                <input
                                    type="file"
                                    id="image-upload"
                                    name="image-upload"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        className="bg-[#246BFD] flex justify-center items-center rounded-full w-[50px] h-[50px] p-2"
                        type="button"
                        onClick={handleSendClick}
                    >
                        <Image
                            src={require(`../../assets/icons/${text || imageFile || audioBlob ? 'send' : isRecording ? 'stop' : 'record'}.svg`)}
                            width={20}
                            height={20}
                            alt={text || imageFile ? 'send' : isRecording ? 'stop' : 'record'}
                        />
                    </button>
                </div>
            </form>
        </div>
    )
}
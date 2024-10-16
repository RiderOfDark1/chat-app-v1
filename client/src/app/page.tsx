'use client';
import Image from "next/image";
import { useEffect, useState } from 'react';
import io from "socket.io-client";

const socket = io();

export default function Home() {

	const [messages, setMessages] = useState<string[]>([]);
	const [input, setInput] = useState<string>('');

	useEffect(() => {
		socket.on('chat message', (msg: string) => {
			setMessages((prev) => [...prev, msg]);
		});

		return () => {
			socket.off('chat message');
		}

	}, []);

	const handleSendMessage = () => {
		if (input.trim()) {
			socket.emit('chat message', input);
			setInput('');
		}
	};

	return (
		<div>
			<h1>Message app</h1>
			{messages.map((msg, index) => (
				<div key={index}>{msg}</div>
			))}

			<input 
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onKeyUp={(e) => e.key === 'Enter' && handleSendMessage()}
			/>
			<button onClick={handleSendMessage}>Send</button>
		</div>
	);
}

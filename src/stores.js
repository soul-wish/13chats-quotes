import { writable } from 'svelte/store';

export const isModalVisible = writable(false);
export const currentQuoteIndex = writable(0);
export const quotes = writable([]);

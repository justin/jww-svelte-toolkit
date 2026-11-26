import 'jww-svelte-toolkit/theme.css';
import { mount } from 'svelte';
import Controls from './Controls.svelte';

mount(Controls, { target: document.querySelector('main')! });

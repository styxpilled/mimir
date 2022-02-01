import Options from './Options.svelte'

const app = new Options({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app

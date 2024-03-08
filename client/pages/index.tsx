import { Button } from '@fluentui/react-components';

const Page = () => {
	return (
		<div>
			<h1>Hello, Fluent UI!</h1>
			<Button
				onClick={() => {
					alert('clicked');
				}}
			>
				Click me
			</Button>
		</div>
	);
};

export default Page;

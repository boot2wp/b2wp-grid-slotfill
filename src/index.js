import { ExampleColumnsPanel } from "./ExampleColumnsPanel";
import { registerPlugin } from "@wordpress/plugins";

console.log("I am a SlotFill");

registerPlugin("example-grid-columns-panel", {
	render: () => <ExampleColumnsPanel />,
	scope: "grid-user-slots",
});

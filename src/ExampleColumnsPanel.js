/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";
import { store as blockEditorStore } from "@wordpress/block-editor";
import { RangeControl } from "@wordpress/components";

export const ExampleColumnsPanel = () => {
	const PluginGridUserPanel = wp.editPost.PluginGridUserPanel;

	const { clientId } = useSelect((select) => {
		const { getSelectedBlockClientId } = select(blockEditorStore);
		const selectedClientId = getSelectedBlockClientId();

		return {
			clientId: selectedClientId,
		};
	});

	const { updateBlockAttributes } = useDispatch(blockEditorStore);

	const [hasUpdated, setHasUpdated] = useState(false);
	const [columns, setColumns] = useState(undefined);

	useEffect(() => {
		if (!hasUpdated) {
			return;
		}

		let newTemplateColumns = "";
		for (let i = 0; i < columns; i++) {
			newTemplateColumns = newTemplateColumns + "1fr ";
		}

		const newAttributes = {
			templateColumns: newTemplateColumns.trim(),
			templateRows: "",
			templateAreas: "",
			autoColumns: "",
			autoRows: "",
			autoFlow: "",
			customCSS: "",
			numberNamedAreas: 0,
		};

		if (clientId) {
			updateBlockAttributes([clientId], newAttributes);
		}
	}, [columns, clientId, hasUpdated, updateBlockAttributes]);

	return (
		<PluginGridUserPanel title={__("Example Columns")}>
			<SetColumns
				columns={columns}
				setColumns={setColumns}
				setHasUpdated={setHasUpdated}
			/>
		</PluginGridUserPanel>
	);
};

const SetColumns = ({ columns, setColumns, setHasUpdated }) => {
	const updateColumns = (val) => {
		setHasUpdated(true);
		setColumns(val);
	};

	return (
		<RangeControl
			label={__("Number of columns")}
			value={columns}
			onChange={(val) => updateColumns(val)}
			min={1}
			max={12}
		/>
	);
};

import React from 'react';
import ItemsDialog from "./ItemsDialog";
import SpellsDialog from "./SpellsDialog";
import PowersDialog from "./PowersDialog";
import MoveDialog from './MoveDialog';

export const itemsdialog = <ItemsDialog/>;
export const spellsdialog = <SpellsDialog/>;
export const powersdialog = <PowersDialog/>;
export const movedialog = <MoveDialog/>;

export const show = (dialog) => {
    document.dispatchEvent(new CustomEvent("push_ui_element", {"detail": dialog } ));
}

export const pop = () => {
    document.dispatchEvent(new CustomEvent("pop_ui_element"));
}
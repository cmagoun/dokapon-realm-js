export const set = (ui, modal) => {
    document.dispatchEvent(new CustomEvent("set_ui_elements", {"detail": {ui, modal} } ));
}

export const MODAL = true;
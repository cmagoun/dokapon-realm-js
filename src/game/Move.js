import * as Vector from "../utils/vector";

export const roll = (game) => {
    const player = game.currentPlayer();

    const roll = Vector.getRandomInt(1, 25);
    const moveroll = Math.ceil((roll - 1)/4);

    player.edit("turntaker", {moveroll});
}
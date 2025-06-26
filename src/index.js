// Definindo objeto player1
const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

// Definindo objeto player2
const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

// Função de rolar dados
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// Sorteio do bloco da rodada (sem ARMADILHA)
async function getRandomBlock() {
    let random = Math.random();
    let result;
    if (random < 0.33) {
        result = "RETA";
    } else if (random < 0.66) {
        result = "CURVA";
    } else {
        result = "CONFRONTO";
    }
    return result;
}

// Exibe rolagem de dado + atributo
async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block}: ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

// Motor da corrida
async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        let diceResult1 = rollDice();
        let diceResult2 = rollDice();

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        // RETA: VELOCIDADE
        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;
            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
        }

        // CURVA: MANOBRABILIDADE
        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;
            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
        }

        // CONFRONTO: PODER
        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME} confrontou com ${character2.NOME} 🥊`);
            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`);
                character2.PONTOS--;
            } else if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`);
                character1.PONTOS--;
            } else {
                console.log("Confronto empatado! Nenhum ponto foi perdido.");
            }
        }

        // Pontuação só em RETA e CURVA
        if (block === "RETA" || block === "CURVA") {
            if (totalTestSkill1 > totalTestSkill2) {
                console.log(`${character1.NOME} marcou um ponto!`);
                character1.PONTOS++;
            } else if (totalTestSkill2 > totalTestSkill1) {
                console.log(`${character2.NOME} marcou um ponto!`);
                character2.PONTOS++;
            } else {
                console.log("Empate na rodada, ninguém marcou ponto.");
            }
        }

        // ARMADILHA ALEATÓRIA PARA CADA JOGADOR
    let trapChance1 = Math.random();
    let trapChance2 = Math.random();

    if (trapChance1 < 0.25) {
    console.log(`${character1.NOME} caiu numa armadilha! ⚠️`);
    if (character1.PONTOS > 0) {
        console.log(`${character1.NOME} perdeu 1 ponto na armadilha! 🕳️`);
        character1.PONTOS--;
    } else {
        console.log(`${character1.NOME} foi atingido, mas não tinha ponto para perder. 😵`);
    }
    }

    if (trapChance2 < 0.25) {
      console.log(`${character2.NOME} caiu numa armadilha! ⚠️`);
    if (character2.PONTOS > 0) {
        console.log(`${character2.NOME} perdeu 1 ponto na armadilha! 🕳️`);
        character2.PONTOS--;
    } else {
        console.log(`${character2.NOME} foi atingido, mas não tinha ponto para perder. 😵`);
    }
    }

        console.log("===============================");
    }
}

// Declaração do vencedor
async function declareWinner(character1, character2) {
    console.log("Resultado final:");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

    if (character1.PONTOS > character2.PONTOS) {
        console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
    } else {
        console.log("A corrida terminou em empate 🟰");
    }
}

// Início do jogo
(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();

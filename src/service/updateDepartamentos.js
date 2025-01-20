import fs from 'fs'

// Função principal
function processDepartamentos(inputFile, outputFile) {
  // Ler o arquivo JSON
  fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return;
    }

    try {
      // Parse do JSON
      const jsonData = JSON.parse(data);

      // Verificar se a estrutura contém o array "Departamentos"
      if (!jsonData.Departamentos || !Array.isArray(jsonData.Departamentos)) {
        console.error('O arquivo não contém a estrutura esperada "Departamentos".');
        return;
      }

      // Transformar os dados
      const outputData = jsonData.Departamentos.reduce((acc, curr) => {
        const { ID, ...rest } = curr; // Remove o campo "ID" do objeto
        acc[ID] = rest; // Usa o valor de "ID" como chave no objeto resultante
        return acc;
      }, {});

      // Salvar o resultado no arquivo de saída
      fs.writeFile(outputFile, JSON.stringify(outputData, null, 2), (err) => {
        if (err) {
          console.error('Erro ao salvar o arquivo:', err);
          return;
        }
        console.log(`Arquivo processado com sucesso! Resultado salvo em "${outputFile}".`);
      });
    } catch (parseError) {
      console.error('Erro ao processar o arquivo JSON:', parseError);
    }
  });
}

// Arquivos de entrada e saída
const inputFile = './departamentos.json';
const outputFile = './departamentos_new.json';

// Chamar a função
processDepartamentos(inputFile, outputFile);

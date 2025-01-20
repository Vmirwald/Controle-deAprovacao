import fs from 'fs';

// Ler os arquivos JSON existentes
const unidadesPath = './unidades.json';
const departamentosPath = './departamentos.json';

const unidades = JSON.parse(fs.readFileSync(unidadesPath, 'utf-8'));
const departamentos = JSON.parse(fs.readFileSync(departamentosPath, 'utf-8'));

// Atualizar cada unidade com os IDs de departamentos
departamentos.Departamentos.forEach(departamento => {
  const unidadeID = departamento.UnidadeID; // Identifica a unidade associada
  if (unidades[unidadeID]) {
    // Adiciona o campo Departamentos se não existir
    if (!unidades[unidadeID].Departamentos) {
      unidades[unidadeID].Departamentos = [];
    }
    // Adiciona o ID do departamento
    unidades[unidadeID].Departamentos.push(departamento.ID);
  }
});

// Escrever o novo arquivo `unidades_populado.json`
fs.writeFileSync('./unidades_new.json', JSON.stringify(unidades, null, 2));

console.log('unidades.json atualizado com sucesso e salvo como unidades_new.json');

import { CaseConverterEnum, generateTemplateFiles } from 'generate-template-files';

generateTemplateFiles([
  {
    option: 'Create Component',
    defaultCase: CaseConverterEnum.PascalCase,
    entry: {
      folderPath: './tools/templates/react/redux-store/',
    },
    stringReplacers: ['__store__', { question: 'Insert model name', slot: '__model__' }],
    output: {
      path: './src/stores/__store__(lowerCase)',
      pathAndFileNameDefaultCase: CaseConverterEnum.KebabCase,
      overwrite: true,
    },
  },
]);
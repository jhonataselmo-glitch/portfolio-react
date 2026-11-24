import {readFile,writeFile,mkdir,cp,rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import ts from 'typescript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
const source = (await readFile('app/page.tsx','utf8')).replace("from 'lucide-react'", "from 'lucide-react/dist/cjs/lucide-react.js'");
const result = ts.transpileModule(source,{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022},reportDiagnostics:true});
const errors=(result.diagnostics??[]).filter(d=>d.category===ts.DiagnosticCategory.Error);
if(errors.length) throw Error(errors.map(d=>ts.flattenDiagnosticMessageText(d.messageText,'\n')).join('\n'));
await mkdir('.static-build',{recursive:true});
const entry=resolve('.static-build/page.mjs');
await writeFile(entry,result.outputText);
try {
 const {default:Home}=await import(entry+'?v='+Date.now());
 const markup=renderToStaticMarkup(React.createElement(Home));
 await rm('dist',{recursive:true,force:true});
 await mkdir('dist',{recursive:true});
 await cp('public','dist',{recursive:true});
 const css=(await readFile('app/globals.css','utf8')).replace(/^@import .*;\s*$/gm,'');
 await writeFile('dist/styles.css',css);
 const layout=await readFile('app/layout.tsx','utf8');
 const title=layout.match(/title:'([^']+)'/)[1];
 const description=layout.match(/description:'([^']+)'/)[1];
 const html='<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+title+'</title><meta name="description" content="'+description+'"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/styles.css"></head><body>'+markup+'</body></html>';
 if(/14 anos|a informar/.test(html)) throw Error('Conteúdo desatualizado encontrado');
 for(const id of ['inicio','conteudo','sobre','projetos','contato']) if(!html.includes('id="'+id+'"')) throw Error('Destino de navegação ausente: '+id);
 await writeFile('dist/index.html',html);
 console.log('Static portfolio built successfully; navigation and content checks passed.');
}finally{await rm('.static-build',{recursive:true,force:true});}

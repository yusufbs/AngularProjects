# AngularProjects

## To Generate document of this project

### Do the following as per [Compodoc](https://compodoc.app/)

1. in angular cli type the following `ng add @compodoc/compodoc`
2. Create **tsconfig.doc.json** in the root, same level as src
3. Add below code in _tsconfig.doc.json_ file

```
{
    "include": ["src/**/*.ts"],
    "exclude": ["src/test.ts", "src/**/*.spec.ts", "src/app/file-to-exclude.ts"]
}
```

4. run the documentation by typing in `compodoc -p tsconfig.doc.json -s`
5. browse the documentation [here](http://127.0.0.1:8000)

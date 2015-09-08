## Event Decorator

#### Usage

```javascript
@Event class A {}

var a = new A();

a.on('test', (arg) => {
  console.log(arg);
});

a.trigger('test', [ 'test' ]);
```

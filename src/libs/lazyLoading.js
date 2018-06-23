// export default (parent, name) => () =>
// import (`@/page/${parent}/${name}.vue`)
export default (parent, child) => () => {
    if (parent && child) {
        import (`@/page/${parent}/${child}.vue`)
    } else {
        import (`@/page/main.vue`)
    }
}
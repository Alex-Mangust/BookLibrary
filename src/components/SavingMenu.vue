<script>
    export default {
        name: "savingMenu",
        props: ["backgroundColor"],
        methods: {
            savingChoice(choice) {
                this.$el.style.display = "none";
                this.$emit('saving', choice);
            },
            showSavingMenu() {
                this.$el.style.display = "flex";
            }
        }
    }
</script>

<template>
    <div :style="{background: this.backgroundColor}" class="saving_menu">
        <h1>Сохранить изменения?</h1>
        <div class="saving_menu_buttons">
            <button @click.stop="savingChoice(true)">Да</button>
            <button @click.stop="savingChoice(false)">Нет</button>
        </div>
    </div>
</template>
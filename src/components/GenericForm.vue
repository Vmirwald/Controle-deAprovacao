<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div v-for="field in formFields" :key="field.name" class="form-group">
        <!-- Rótulo do campo -->
        <label v-if="field.label" :for="field.name" class="form-label">{{ field.label }}</label>
        <!-- Renderização dinâmica dos componentes -->
        <component 
          :is="getComponentName(field.type)"
          v-model="localFormData[field.name]"
          v-bind="field.props"
          :id="field.name"
        ></component>
      </div>
      <div class="mt-4">
        <GenericButton
          v-for="button in buttons"
          :key="button.action"
          :action="button.action"
          :label="button.label"
          :iconClass="button.iconClass"
          :btnClass="button.btnClass"
          @click="handleButtonClick(button.action)"
        />
      </div>
    </form>
  </div>
</template>

<script>
import InputText from "@/components/form/InputText.vue";
import InputEmail from "@/components/form/InputEmail.vue";
import InputNumber from "@/components/form/InputNumber.vue";
import InputCalendar from "@/components/form/InputCalendar.vue";
import SelectOption from "@/components/form/SelectOption.vue";
import CheckBox from "@/components/form/CheckBox.vue";
import FileInput from "@/components/form/FileInput.vue";
import RadioInput from "@/components/form/RadioInput.vue";
import TextArea from "@/components/form/TextArea.vue";
import GenericButton from "@/components/generic/GenericButton.vue";

export default {
  components: {
    InputText,
    InputEmail,
    InputNumber,
    InputCalendar,
    SelectOption,
    CheckBox,
    FileInput,
    RadioInput,
    TextArea,
    GenericButton,
  },
  props: {
    formFields: {
      type: Array,
      required: true,
    },
    formData: {
      type: Object,
      required: true,
    },
    buttons: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      localFormData: { ...this.formData }, // Copia do formData para evitar mutação direta
    };
  },
  watch: {
    // Atualiza a cópia local quando o formData muda externamente
    formData: {
      deep: true,
      handler(newValue) {
        this.localFormData = { ...newValue };
      },
    },
  },
  methods: {
    // Mapeia os tipos de campo para os componentes correspondentes
    getComponentName(type) {
      const componentMap = {
        text: "InputText",
        email: "InputEmail",
        number: "InputNumber",
        date: "InputCalendar",
        select: "SelectOption",
        checkbox: "CheckBox",
        file: "FileInput",
        radio: "RadioInput",
        textarea: "TextArea",
      };
      return componentMap[type] || "div";
    },
    handleButtonClick(action) {
      this.$emit(action, this.localFormData);
    },
    handleSubmit() {
      console.log("GenericForm - handleSubmit", JSON.stringify(this.localFormData));
      this.$emit("submit", this.localFormData);
    },
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

.form-label {
  margin-bottom: 0.5rem;
  font-weight: bold;
  display: block;
}

.mt-4 {
  margin-top: 1.5rem;
}
</style>

  
  <style scoped>
  .mt-4 {
    margin-top: 1rem;
  }
  </style>
  

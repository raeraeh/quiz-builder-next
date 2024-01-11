import { Flex } from "@chakra-ui/react";
import { useStepEditorContext } from "../../pages/StepEditor/StepEditorContext";
import { FormInput } from "../FormInput";

interface InputBlockProps {
  label: string;
  fieldName: string;
}

export const InputBlock = ({
  label,
  fieldName,
  ...defaultAttrs
}: InputBlockProps) => {
  const stepEditorContext = useStepEditorContext();
  return (
    <Flex alignItems="center" gap="2" p={2}>
      {label && <label className="form-label">{label}</label>}

      <FormInput
        {...defaultAttrs}
        value={stepEditorContext?.formData?.[fieldName] ?? ""}
        onChange={(e) =>
          stepEditorContext?.setFormData({
            ...stepEditorContext?.formData,
            [fieldName]: e.target.value,
          })
        }
      />

      {stepEditorContext?.formData?.[fieldName] &&
        stepEditorContext?.formData[fieldName]}
    </Flex>
  );
};

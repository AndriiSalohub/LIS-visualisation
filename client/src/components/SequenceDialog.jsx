/* eslint-disable react/prop-types */
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Pencil, Check, X, AlertCircle, Plus, Trash2 } from "lucide-react";

const formatFullSequence = (seq) => {
  if (seq.length <= 10) {
    return seq.join(", ");
  }

  return seq
    .reduce((rows, num, index) => {
      const rowIndex = Math.floor(index / 10);
      if (!rows[rowIndex]) {
        rows[rowIndex] = [];
      }
      rows[rowIndex].push(num);
      return rows;
    }, [])
    .map((row) => row.join(", "))
    .join(",\n");
};

const SequenceDialog = ({ sequence, onClose, onLoad, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSequence, setEditedSequence] = useState([...sequence]);
  const [newElement, setNewElement] = useState("");
  const [tempInputs, setTempInputs] = useState({});
  const [invalidInputs, setInvalidInputs] = useState({});

  const stats = {
    length: sequence.length,
    min: Math.min(...sequence),
    max: Math.max(...sequence),
  };

  const validateInput = (value) => {
    if (value === "") return false;
    if (value === "-") return false;

    return /^-?\d+$/.test(value);
  };

  const handleEdit = (index, value) => {
    setTempInputs({
      ...tempInputs,
      [index]: value,
    });

    const newInvalidInputs = { ...invalidInputs };

    if (!validateInput(value)) {
      newInvalidInputs[index] = true;
    } else {
      delete newInvalidInputs[index];
    }
    setInvalidInputs(newInvalidInputs);

    if (value === "") {
      const newSequence = [...editedSequence];
      newSequence[index] = "";

      setEditedSequence(newSequence);
    } else if (validateInput(value)) {
      const parsedValue = parseInt(value);
      const newSequence = [...editedSequence];
      newSequence[index] = parsedValue;
      setEditedSequence(newSequence);
    }
  };

  const handleNewElementChange = (value) => {
    setNewElement(value);
    const newInvalidInputs = { ...invalidInputs };
    if (!validateInput(value)) {
      newInvalidInputs.new = true;
    } else {
      delete newInvalidInputs.new;
    }
    setInvalidInputs(newInvalidInputs);
  };

  const handleAddElement = () => {
    if (validateInput(newElement) && newElement !== "") {
      const parsedValue = parseInt(newElement);
      setEditedSequence([...editedSequence, parsedValue]);
      setNewElement("");
      const newInvalidInputs = { ...invalidInputs };
      delete newInvalidInputs.new;
      setInvalidInputs(newInvalidInputs);
    }
  };

  const handleRemoveElement = (index) => {
    setEditedSequence(editedSequence.filter((_, idx) => idx !== index));
    const newTempInputs = { ...tempInputs };
    delete newTempInputs[index];
    setTempInputs(newTempInputs);
    const newInvalidInputs = { ...invalidInputs };
    delete newInvalidInputs[index];
    setInvalidInputs(newInvalidInputs);
  };

  const hasInvalidInputs = Object.keys(invalidInputs).length > 0;

  const handleSave = () => {
    if (!hasInvalidInputs) {
      const validSequence = editedSequence.filter((val) => val !== "");
      onEdit(validSequence);
      setIsEditing(false);
      setTempInputs({});
      setInvalidInputs({});
    }
  };

  const handleCancel = () => {
    setEditedSequence([...sequence]);
    setIsEditing(false);
    setTempInputs({});
    setInvalidInputs({});
    setNewElement("");
  };

  return (
    <DialogContent className="max-w-2xl w-[90vw] max-h-[90vh] overflow-hidden flex flex-col">
      <DialogHeader>
        <div className="flex justify-between items-center">
          <DialogTitle>Деталі послідовності</DialogTitle>
          {!isEditing ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSave}
                disabled={hasInvalidInputs}
                title={
                  hasInvalidInputs
                    ? "Виправте некоректні значення перед збереженням"
                    : "Зберегти зміни"
                }
              >
                <Check className="h-4 w-4 text-green-600" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleCancel}>
                <X className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          )}
        </div>
      </DialogHeader>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="bg-gray-50 p-2 sm:p-3 rounded-lg">
              <div className="text-xs text-gray-500 capitalize">{key}</div>
              <div className="font-medium">{value}</div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Візуальне прев'ю:</div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 bg-gray-50 p-2 sm:p-4 rounded-lg">
            {(isEditing ? editedSequence : sequence).map((num, idx) => (
              <div key={idx} className="relative group">
                {isEditing ? (
                  <div
                    className={`flex items-center gap-1 bg-white rounded-lg shadow-sm p-1 ${
                      invalidInputs[idx] ? "ring-2 ring-red-500" : ""
                    }`}
                  >
                    <div className="relative">
                      <Input
                        type="text"
                        inputMode="numeric"
                        value={tempInputs[idx] ?? num}
                        onChange={(e) => handleEdit(idx, e.target.value)}
                        className={`w-16 h-10 text-center p-1 ${
                          invalidInputs[idx] ? "text-red-600" : ""
                        }`}
                      />
                      {invalidInputs[idx] && (
                        <AlertCircle className="absolute -right-6 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveElement(idx)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center bg-white shadow-sm rounded-lg text-sm">
                    {num}
                  </div>
                )}
              </div>
            ))}
            {isEditing && (
              <div
                className={`flex items-center gap-1 bg-white rounded-lg shadow-sm p-1 ${
                  invalidInputs.new ? "ring-2 ring-red-500" : ""
                }`}
              >
                <div className="relative">
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={newElement}
                    onChange={(e) => handleNewElementChange(e.target.value)}
                    placeholder="Новий"
                    className={`w-16 h-10 text-center p-1 ${
                      invalidInputs.new ? "text-red-600" : ""
                    }`}
                  />
                  {invalidInputs.new && (
                    <AlertCircle className="absolute -right-6 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleAddElement}
                  disabled={newElement === "" || !validateInput(newElement)}
                >
                  <Plus className="h-4 w-4 text-green-600" />
                </Button>
              </div>
            )}
            {hasInvalidInputs && (
              <div className="text-sm text-red-600 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Виправте некоректні значення перед збереженням
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Необроблена послідовність:</div>
          <div className="bg-gray-50 p-2 sm:p-4 rounded-lg">
            <pre className="text-xs sm:text-sm whitespace-pre-wrap break-all font-mono">
              [{formatFullSequence(isEditing ? editedSequence : sequence)}]
            </pre>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t mt-4">
        <Button onClick={onLoad} className="w-20 sm:w-24">
          Завантажити
        </Button>
        <Button variant="outline" onClick={onClose} className="w-20 sm:w-24">
          Закрити
        </Button>
      </div>
    </DialogContent>
  );
};

export default SequenceDialog;

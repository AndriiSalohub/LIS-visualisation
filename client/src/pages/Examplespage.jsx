import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Pencil, Trash2, Plus, Check, X, Upload, Download } from "lucide-react";
import useExamples from "../store";

const ExamplesPage = () => {
  const { examples, addExample, removeExample, editExample, toggleSelect } =
    useExamples();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingExample, setEditingExample] = useState(null);
  const [newExample, setNewExample] = useState({ name: "", sequence: "" });
  const [errors, setErrors] = useState({ name: "", sequence: "" });
  const [editErrors, setEditErrors] = useState({ name: "", sequence: "" });

  const fileInputRef = useRef(null);

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const fileContent = await file.text();
      const parsedData = JSON.parse(fileContent);

      if (!Array.isArray(parsedData)) {
        console.error("Некоректний формат файлу: Очікується масив.");
        return;
      }

      const areValidExamples = parsedData.every((item) => {
        return (
          item && typeof item.name === "string" && Array.isArray(item.sequence)
        );
      });

      if (!areValidExamples) {
        console.error(
          "Некоректний формат файлу: Очікується масив об'єктів з властивостями name (рядок) та sequence(масив чисел).",
        );
        return;
      }

      parsedData.forEach((example) => {
        if (examples.some((ex) => ex.name === example.name.trim())) {
          console.error(
            `Помилка: Приклад з назвою ${example.name} вже існує. Пропускається...`,
          );
        } else {
          addExample({
            name: example.name.trim(),
            sequence: example.sequence,
          });
        }
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Не вдалося імпортувати дані:", error);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(examples, null, 2); // Format with 2 space indentation
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "examples.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const validateSequence = (sequence) => {
    if (!sequence) return "Послідовність обов'язкова";
    const numbers = sequence.split(",").map((num) => num.trim());

    const hasInvalidNumbers = numbers.some((num) => {
      const parsed = parseInt(num);
      return isNaN(parsed) || parsed.toString() !== num.trim();
    });

    if (hasInvalidNumbers)
      return "Послідовність повинна містити лише дійсні числа";
    if (numbers.length < 1)
      return "Послідовність повинна містити принаймні одне число";

    return "";
  };

  const validateName = (name) => {
    if (!name.trim()) return "Назва обов'язковa";
    if (name.length < 3) return "Навза повиннa містити принаймні 3 символи";
    if (name.length > 50) return "Назва не повинна перевищувати 50 символів";
    if (examples.some((ex) => ex.name === name.trim()))
      return "Ім'я повинно бути унікальним";
    return "";
  };

  const validateForm = (data, isEditing = false) => {
    const nameError = validateName(data.name);
    const sequenceError = validateSequence(data.sequence);

    if (isEditing) {
      setEditErrors({ name: nameError, sequence: sequenceError });
    } else {
      setErrors({ name: nameError, sequence: sequenceError });
    }

    return !nameError && !sequenceError;
  };

  const handleAdd = () => {
    if (!validateForm(newExample)) return;

    const sequenceArray = newExample.sequence
      .split(",")
      .map((num) => parseInt(num.trim()))
      .filter((num) => !isNaN(num));

    addExample({
      name: newExample.name.trim(),
      sequence: sequenceArray,
    });

    setNewExample({ name: "", sequence: "" });
    setErrors({ name: "", sequence: "" });
    setIsAddDialogOpen(false);
  };

  const handleStartEdit = (example) => {
    setEditingExample({
      ...example,
      sequence: example.sequence.join(", "),
    });
    setEditErrors({ name: "", sequence: "" });
  };

  const handleSaveEdit = () => {
    if (!validateForm(editingExample, true)) return;

    const sequenceArray = editingExample.sequence
      .split(",")
      .map((num) => parseInt(num.trim()))
      .filter((num) => !isNaN(num));

    editExample({
      ...editingExample,
      name: editingExample.name.trim(),
      sequence: sequenceArray,
    });

    setEditingExample(null);
    setEditErrors({ name: "", sequence: "" });
  };

  const findLIS = (sequence) => {
    const dp = Array(sequence.length).fill(1);

    for (let i = 1; i < sequence.length; i++) {
      for (let j = 0; j < i; j++) {
        if (sequence[i] > sequence[j]) {
          dp[i] = Math.max(dp[i], dp[j] + 1);
        }
      }
    }

    return Math.max(...dp);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Бібліотека прикладів LIS</CardTitle>
          <CardDescription>
            Керуйте та візуалізуйте приклади найдовшої зростаючої
            підпослідовності
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2 items-center">
              <input
                type="file"
                accept=".json"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <Button
                onClick={handleImport}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" /> Імпорт
              </Button>
              <Button
                onClick={handleExport}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Експорт
              </Button>
            </div>
            <Dialog
              open={isAddDialogOpen}
              onOpenChange={(open) => {
                setIsAddDialogOpen(open);
                if (!open) {
                  setNewExample({ name: "", sequence: "" });
                  setErrors({ name: "", sequence: "" });
                }
              }}
            >
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Додати новий приклад
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Додати новий приклад</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Ім'я</Label>
                    <Input
                      value={newExample.name}
                      onChange={(e) => {
                        setNewExample({ ...newExample, name: e.target.value });
                        setErrors({ ...errors, name: "" });
                      }}
                      placeholder="Ім'я прикладу"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <Alert variant="destructive" className="mt-2">
                        <AlertDescription>{errors.name}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Послідовність (числа через кому)</Label>
                    <Input
                      value={newExample.sequence}
                      onChange={(e) => {
                        setNewExample({
                          ...newExample,
                          sequence: e.target.value,
                        });
                        setErrors({ ...errors, sequence: "" });
                      }}
                      placeholder="1, 2, 3, 4, 5"
                      className={errors.sequence ? "border-red-500" : ""}
                    />
                    {errors.sequence && (
                      <Alert variant="destructive" className="mt-2">
                        <AlertDescription>{errors.sequence}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                  <Button onClick={handleAdd} className="w-full">
                    Додати приклад
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <ScrollArea className="h-[400px] rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Обрані</TableHead>
                  <TableHead>Назва</TableHead>
                  <TableHead>Послідовність</TableHead>
                  <TableHead>Довжина LIS</TableHead>
                  <TableHead className="w-28">Дії</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {examples.map((example) => (
                  <TableRow key={example.id}>
                    <TableCell>
                      <div className="flex justify-center items-center">
                        <Checkbox
                          checked={example.selected}
                          onCheckedChange={() => toggleSelect(example.id)}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      {editingExample?.id === example.id ? (
                        <div className="space-y-2">
                          <Input
                            value={editingExample.name}
                            onChange={(e) => {
                              setEditingExample({
                                ...editingExample,
                                name: e.target.value,
                              });
                              setEditErrors({ ...editErrors, name: "" });
                            }}
                            className={editErrors.name ? "border-red-500" : ""}
                          />
                          {editErrors.name && (
                            <Alert variant="destructive">
                              <AlertDescription>
                                {editErrors.name}
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      ) : (
                        example.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editingExample?.id === example.id ? (
                        <div className="space-y-2">
                          <Input
                            value={editingExample.sequence}
                            onChange={(e) => {
                              setEditingExample({
                                ...editingExample,
                                sequence: e.target.value,
                              });
                              setEditErrors({ ...editErrors, sequence: "" });
                            }}
                            className={
                              editErrors.sequence ? "border-red-500" : ""
                            }
                          />
                          {editErrors.sequence && (
                            <Alert variant="destructive">
                              <AlertDescription>
                                {editErrors.sequence}
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      ) : (
                        `[${example.sequence.join(", ")}]`
                      )}
                    </TableCell>
                    <TableCell>{findLIS(example.sequence)}</TableCell>
                    <TableCell>
                      {editingExample?.id === example.id ? (
                        <div className="space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleSaveEdit}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingExample(null);
                              setEditErrors({ name: "", sequence: "" });
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStartEdit(example)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeExample(example.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamplesPage;

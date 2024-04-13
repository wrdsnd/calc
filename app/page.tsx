"use client";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  UseNumberInputReturn,
  useNumberInput,
} from "@chakra-ui/react";

export default function Page() {
  const fuelOnStart = useNumberInput({
    step: 1,
    min: 0,
    precision: 0,
  });

  const fuelReceived = useNumberInput({
    step: 1,
    min: 0,
    precision: 2,
  });

  const fuelOnEnd = useNumberInput({
    step: 1,
    min: 0,
    precision: 0,
  });

  const firstShiftRides = useNumberInput({
    step: 1,
    min: 0,
    precision: 0,
  });

  const secondShiftRides = useNumberInput({
    step: 1,
    min: 0,
    precision: 0,
  });

  return (
    <Container as="main" maxW="900px">
      <Heading as="h1" size="lg" mb={4}>
        Калькулятор межсменных остатков
      </Heading>
      <Heading as="h2" size="md" mb={4}>
        Ввод данных
      </Heading>
      <Controls
        fuelOnStart={fuelOnStart}
        fuelReceived={fuelReceived}
        fuelOnEnd={fuelOnEnd}
        firstShiftRides={firstShiftRides}
        secondShiftRides={secondShiftRides}
      />
      <Heading as="h2" size="md" my={4}>
        Результат заполнения путевого листа
      </Heading>
      <ResultTable
        fuelOnStart={fuelOnStart.valueAsNumber || 0}
        fuelReceived={fuelReceived.valueAsNumber || 0}
        firstShiftRides={firstShiftRides.valueAsNumber || 0}
        secondShiftRides={secondShiftRides.valueAsNumber || 0}
        fuelOnEnd={fuelOnEnd.valueAsNumber || 0}
      />
    </Container>
  );
}

interface ResultTableProps {
  fuelOnStart: number;
  fuelReceived: number;
  fuelOnEnd: number;
  firstShiftRides: number;
  secondShiftRides: number;
}
function ResultTable({
  fuelOnStart,
  fuelReceived,
  firstShiftRides,
  secondShiftRides,
  fuelOnEnd,
}: ResultTableProps) {
  const totalRides = firstShiftRides + secondShiftRides;
  const fuelAtTheEndOfTheFirstShift = totalRides > 0 ? Math.round(
    fuelOnStart - (fuelReceived / totalRides) * firstShiftRides
  ) : 0;

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th px={1}>Смена</Th>
            <Th px={1} isNumeric>
              Топливо <br />в баке
              <br /> на начало <br />
              смены
            </Th>
            <Th px={1} isNumeric>
              Получено
              <br /> топлива
            </Th>
            <Th px={1} isNumeric>
              Топливо <br />в баке <br />в конце <br />
              смены
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td px={1}>1</Td>
            <Td px={1} isNumeric>
              {fuelOnStart}
            </Td>
            <Td px={1} isNumeric></Td>
            <Td px={1} isNumeric>
              {fuelAtTheEndOfTheFirstShift}
            </Td>
          </Tr>
          <Tr>
            <Td px={1}>2</Td>
            <Td px={1} isNumeric>
              {fuelAtTheEndOfTheFirstShift}
            </Td>
            <Td px={1} isNumeric>
              {fuelReceived}
            </Td>
            <Td px={1} isNumeric>
              {fuelOnEnd}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

function Controls(p: {
  fuelOnStart: UseNumberInputReturn;
  fuelReceived: UseNumberInputReturn;
  fuelOnEnd: UseNumberInputReturn;
  firstShiftRides: UseNumberInputReturn;
  secondShiftRides: UseNumberInputReturn;
}) {
  return (
    <Box>
      <FormControl mb={2}>
        <FormLabel>Топливо на начало смены (утро)</FormLabel>
        <HStack maxW="320px">
          <Input {...p.fuelOnStart.getInputProps()} />
        </HStack>
      </FormControl>
      <FormControl mb={2}>
        <FormLabel>Получено топлива (заправка)</FormLabel>
        <HStack maxW="320px">
          <Input {...p.fuelReceived.getInputProps()} />
        </HStack>
      </FormControl>
      <FormControl mb={2}>
        <FormLabel>Топливо в конце смены (вечер)</FormLabel>
        <HStack maxW="320px">
          <Input {...p.fuelOnEnd.getInputProps()} />
        </HStack>
      </FormControl>
      <FormControl mb={2}>
        <FormLabel>Количество рейсов 1 смены</FormLabel>
        <HStack maxW="320px">
          <Input {...p.firstShiftRides.getInputProps()} />
        </HStack>
      </FormControl>
      <FormControl>
        <FormLabel>Количество рейсов 2 смены</FormLabel>
        <HStack maxW="320px">
          <Input {...p.secondShiftRides.getInputProps()} />
        </HStack>
      </FormControl>
    </Box>
  );
}

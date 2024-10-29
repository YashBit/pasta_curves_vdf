import {
  ZkProgram,
  Field,
  Proof,
  Struct
} from 'o1js';

import {
  minRoot,
  minRootIteration,
  fieldModPow,
  calculateFifthRootExponent,
} from './lib/minroot';

class MinRootState extends Struct({
  x: Field,
  y: Field,
}) {}

const MinRootProgram = ZkProgram({
  name: 'minroot',
  publicInput: Field,
  publicOutput: MinRootState,

  methods: {
    init: {
      privateInputs: [Field],
      async method(publicInput: Field, y0: Field) {
        return {
          publicOutput: new MinRootState({
            x: publicInput,
            y: y0,
          }),
        };
      },
    },

    step: {
      privateInputs: [],
      async method(publicInput: Field) {
        const [nextX, nextY] = minRootIteration(publicInput, publicInput);
        
        return {
          publicOutput: new MinRootState({
            x: nextX,
            y: nextY,
          }),
        };
      },
    },
  },
});

const MinRootProof = ZkProgram.Proof(MinRootProgram);

export { MinRootProgram, MinRootProof, MinRootState };
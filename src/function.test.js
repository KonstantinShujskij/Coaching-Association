import { addTrener, copyTreners, deepDeleteTrener, deleteTrener, getCount, insertTrener, isDeepChild, isParent } from "./function";

describe('validation of functions for working with an array of trainers', () => {
    let treners;
    beforeEach(() => {
        treners = [
            {
                name: 'admin',
                email: 'admin@exemple.com',
                childs: [                
                    {
                        name: 'user-1',
                        email: 'user1@exemple.com',
                        childs: [
                            {
                                name: 'user-3',
                                email: 'user3@exemple.com',
                                childs: []
                            }
                        ]
                    },
                    {
                        name: 'user-2',
                        email: 'user2@exemple.com',
                        childs: []
                    }
                ]
            }
        ];
    }) 

    test('checking the deep copy function', () => {
        expect(copyTreners(treners)).toEqual(treners);
    });

    test('checking the add trainer function', () => {
        const trener = {
            name: 'user-4',
            email: 'user4@example.com',
            childs: []
        };
        const parent = 'user-1';

        const resaultTreners = [
            {
                name: 'admin',
                email: 'admin@exemple.com',
                childs: [                
                    {
                        name: 'user-1',
                        email: 'user1@exemple.com',
                        childs: [
                            {
                                name: 'user-3',
                                email: 'user3@exemple.com',
                                childs: []
                            },
                            {
                                name: 'user-4',
                                email: 'user4@example.com',
                                childs: []
                            }
                        ]
                    },
                    {
                        name: 'user-2',
                        email: 'user2@exemple.com',
                        childs: []
                    }
                ]
            }
        ];

        expect(addTrener(treners, trener, parent)).toEqual(resaultTreners);
    });

    test('checking function add coach with kids', () => {
        const trener = {
            name: 'user-4',
            email: 'user4@example.com',
            childs: [
                {
                    name: 'user-5',
                    email: 'user5@example.com',
                    childs: []
                },
                {
                    name: 'user-6',
                    email: 'user6@example.com',
                    childs: []
                }
            ]
        };
        const parent = 'user-1';

        const resaultTreners = [
            {
                name: 'admin',
                email: 'admin@exemple.com',
                childs: [                
                    {
                        name: 'user-1',
                        email: 'user1@exemple.com',
                        childs: [
                            {
                                name: 'user-3',
                                email: 'user3@exemple.com',
                                childs: []
                            },
                            {
                                name: 'user-4',
                                email: 'user4@example.com',
                                childs: [
                                    {
                                        name: 'user-5',
                                        email: 'user5@example.com',
                                        childs: []
                                    },
                                    {
                                        name: 'user-6',
                                        email: 'user6@example.com',
                                        childs: []
                                    }
                                ]
                            }                            
                        ]
                    },
                    {
                        name: 'user-2',
                        email: 'user2@exemple.com',
                        childs: []
                    }
                ]
            }
        ];

        expect(addTrener(treners, trener, parent)).toEqual(resaultTreners);
    });

    test('checking the shift function of the trainer among sibling elements', () => {
        const trenerId = 'user-1';
        const resaultTreners = [
            {
                name: 'admin',
                email: 'admin@exemple.com',
                childs: [      
                    {
                        name: 'user-2',
                        email: 'user2@exemple.com',
                        childs: []
                    },
                    {
                        name: 'user-1',
                        email: 'user1@exemple.com',
                        childs: [
                            {
                                name: 'user-3',
                                email: 'user3@exemple.com',
                                childs: []
                            }
                        ]
                    }
                ]
            }
        ];
        
        let shift = 1; // Down
        expect(insertTrener(treners, trenerId, shift)).toEqual(resaultTreners);

        shift = -1; // Up
        expect(insertTrener(resaultTreners, trenerId, shift)).toEqual(treners);
    });

    test('checking the function of non-deep removal of the trainer', () => {
        const trenerId = 'user-1';
        const resaultTreners = [
            {
                name: 'admin',
                email: 'admin@exemple.com',
                childs: [    
                    {
                        name: 'user-3',
                        email: 'user3@exemple.com',
                        childs: []
                    },
                    {
                        name: 'user-2',
                        email: 'user2@exemple.com',
                        childs: []
                    }                 
                ]
            }
        ];
        
        expect(deleteTrener(treners, trenerId)).toEqual(resaultTreners);

    });

    test('checking the deep delete function of the trainer', () => {
        const trenerId = 'user-1';
        const resaultTreners = [
            {
                name: 'admin',
                email: 'admin@exemple.com',
                childs: [    
                    {
                        name: 'user-2',
                        email: 'user2@exemple.com',
                        childs: []
                    }                 
                ]
            }
        ];
        
        expect(deepDeleteTrener(treners, trenerId)).toEqual(resaultTreners);

    });

    test('checking the check function for a "deep" successor', () => {
        expect(isDeepChild(treners, 'user-3', 'admin')).toBe(true)
        expect(isDeepChild(treners, 'user-3', 'user-1')).toBe(true)
        expect(isDeepChild(treners, 'user-3', 'user-2')).toBe(false)
        expect(isDeepChild(treners, 'user-1', 'user-3')).toBe(false)
    });

    test('validation function validation on direct parent', () => {
        expect(isParent(treners[0], 'user-1')).toBe(true)
        expect(isParent(treners[0], 'user-3')).toBe(false)
    });

    test('checking the function of counting the number of coaches', () => {
        expect(getCount(treners)).toBe(4)
    });


})



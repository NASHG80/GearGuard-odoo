export const workCenters = [
    {
        id: 'wc-01',
        name: 'Assembly Line 1',
        code: 'AL-001',
        tag: 'Assembly',
        alternativeWorkcenters: ['Assembly Line 2'],
        costPerHour: 95.00,
        capacity: 1.00,
        timeEfficiency: 100.00,
        oeeTarget: 90.00
    },
    {
        id: 'wc-02',
        name: 'Drill Station Alpha',
        code: 'DS-A',
        tag: 'Machining',
        alternativeWorkcenters: ['Drill Station Beta', 'Universal Machining Center'],
        costPerHour: 45.00,
        capacity: 1.00,
        timeEfficiency: 100.00,
        oeeTarget: 85.00
    },
    {
        id: 'wc-03',
        name: 'Packaging Unit 4',
        code: 'PK-04',
        tag: 'Packaging',
        alternativeWorkcenters: [],
        costPerHour: 30.00,
        capacity: 2.00,
        timeEfficiency: 95.00,
        oeeTarget: 92.50
    },
    {
        id: 'wc-04',
        name: 'Quality Control Bay',
        code: 'QC-B',
        tag: 'Inspection',
        alternativeWorkcenters: [],
        costPerHour: 55.00,
        capacity: 1.00,
        timeEfficiency: 98.00,
        oeeTarget: 99.00
    },
    {
        id: 'wc-05',
        name: 'Painting Booth',
        code: 'PB-01',
        tag: 'Finishing',
        alternativeWorkcenters: ['Painting Booth 2'],
        costPerHour: 70.00,
        capacity: 1.00,
        timeEfficiency: 90.00,
        oeeTarget: 88.00
    }
];
